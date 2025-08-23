import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '@features/subscriptions/services/subscriptions/subscriptions.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { TextAreaComponent } from '@shared/components/text-area/text-area.component';
import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';
import { iInscricao } from '@shared/models/inscricao.model';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TabPanel, TabsModule } from 'primeng/tabs';
import { CheckboxModule } from 'primeng/checkbox';
import { FrequencyService } from '@features/projects/services/frequency/frequency.service';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-form-frequency',
  imports: [
    Dialog,
    Button,
    InputFormComponent,
    TextAreaComponent,
    ReactiveFormsModule,
    TabsModule,
    TabPanel,
    CheckboxModule,
    Toast,
  ],
  templateUrl: './form-frequency.component.html',
  styleUrl: './form-frequency.component.css',
  providers: [ToastService, MessageService],
})
export class FormFrequencyComponent implements OnInit {
  @Input({ required: true }) visible!: boolean;
  @Input({ required: true }) controlId: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  private fb = inject(NonNullableFormBuilder);
  private subscriptionsService = inject(SubscriptionsService);
  private frequencyService = inject(FrequencyService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);

  subscriptions = signal<iInscricao[]>([]);

  forms: { [key: number]: FormGroup } = {};
  activeTab = 1;
  textTitle = signal<string>('');

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId');

    if (projectId) {
      this.loadSubscriptions(projectId);
    }

    for (let i = 1; i <= 4; i++) {
      this.forms[i] = this.fb.group({
        realizada_em: ['', Validators.required],
        tempo_inicio: ['', Validators.required],
        tempo_termino: ['', Validators.required],
        descricao: ['', Validators.required],
        observacao: ['', Validators.required],
        alunos_presentes: this.fb.array([]),
      });
    }
  }

  loadSubscriptions(projectId: string): void {
    this.subscriptionsService
      .getAllByProject(
        projectId,
        eStatusInscricaoProjeto.APROVADO.toLocaleUpperCase()
      )
      .subscribe({
        next: subs => {
          this.subscriptions.set(subs);

          for (let i = 1; i <= 4; i++) {
            const formArray = this.fb.array(
              subs.map(s =>
                this.fb.group({
                  inscricao_id: [s.id],
                  presente: [false],
                  nome: [s.aluno.nome],
                })
              )
            );
            this.forms[i].setControl('alunos_presentes', formArray);
          }
        },
        error: err => console.error('Erro ao carregar inscrições', err),
      });
  }

  getAlunosArray(tab: number): FormArray {
    return this.forms[tab].get('alunos_presentes') as FormArray;
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  submit(): void {
    const formAtual = this.forms[this.activeTab];

    if (formAtual.invalid) {
      formAtual.markAllAsTouched();
      return;
    }

    const alunosPresentesFormArray = this.getAlunosArray(this.activeTab);
    const alunosPresentes = alunosPresentesFormArray.controls
      .filter(alunoCtrl => alunoCtrl.value.presente)
      .map(alunoCtrl => ({
        inscricao_id: alunoCtrl.value.inscricao_id,
        presente: alunoCtrl.value.presente,
      }));

    const dadosParaEnvio: FormData = {
      ...formAtual.value,
      alunos_presentes: alunosPresentes,
    };

    console.log('Dados para envio:', dadosParaEnvio);

    this.frequencyService.save(this.controlId!, dadosParaEnvio).subscribe({
      next: () => {
        this.toast.showSuccess('Frequência salva com sucesso!', 'Sucesso');
        setTimeout(() => {
          this.closeDialog();
        }, 2000);
      },
      error: err => {
        console.error('Erro ao salvar frequência:', err);
        this.toast.showError('Erro ao salvar frequência.', 'Erro');
      },
      complete: () => {
        console.log('Requisição de salvamento concluída.');
      },
    });
  }

  getControl<T = string>(tab: number, controlName: string): FormControl<T> {
    return this.forms[tab].get(controlName) as FormControl<T>;
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }

  changeTextTitle(): string {
    switch (this.activeTab) {
      case 1:
        return 'Primeira Reunião';
      case 2:
        return 'Segunda Reunião';
      case 3:
        return 'Terceira Reunião';
      case 4:
        return 'Quarta Reunião';
      default:
        return '';
    }
  }
}
