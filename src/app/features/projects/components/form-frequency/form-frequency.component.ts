import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
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
import { TokenService } from '@core/services/token/token.service';

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
export class FormFrequencyComponent implements OnInit, OnChanges {
  @Input({ required: true }) visible!: boolean;
  @Input({ required: true }) controlId: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  private fb = inject(NonNullableFormBuilder);
  private subscriptionsService = inject(SubscriptionsService);
  private frequencyService = inject(FrequencyService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private tokenService = inject(TokenService);

  userInfo = signal(this.tokenService.getNameAndTypeUserForToken());
  subscriptions = signal<iInscricao[]>([]);

  form!: FormGroup;
  activeTab = 0;
  textTitle = signal<string>('');

  ngOnInit(): void {
    this.form = this.fb.group({
      frequencias: this.fb.array([]),
    });

    const projectId = this.route.snapshot.paramMap.get('projectId');

    if (projectId) {
      this.loadSubscriptions(projectId);
    }

    console.log(this.controlId);

    if (this.controlId) {
      this.frequencyService.getAll(this.controlId).subscribe({
        next: freqs => {
          console.log('Frequências carregadas:', freqs);
          if (freqs.length) {
            freqs.forEach(f => this.addSemana(f));
          } else {
            this.addSemana();
          }
        },
        error: err => {
          console.error('Erro ao carregar frequências', err);
          this.addSemana();
        },
      });
    } else {
      console.log('Frequências carregadas:');

      this.addSemana();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlId'] && this.controlId) {
      this.loadFrequencies();
    }
  }

  private loadFrequencies(): void {
    this.frequencias.clear();
    this.frequencyService
      .getAll(this.controlId!, undefined, undefined)
      .subscribe({
        next: freqs => {
          if (freqs.length) {
            freqs.forEach(f => this.addSemana(f));
          } else {
            this.addSemana();
          }
        },
        error: err => {
          console.error('Erro ao carregar frequências', err);
          this.addSemana();
        },
      });
  }

  loadForm(f: any): FormGroup {
    const alunosArray = this.fb.array<FormGroup>([]);

    if (this.subscriptions().length) {
      this.subscriptions().forEach(s => {
        const presenteMarcado = f?.presencas?.some(
          (ap: any) => ap.inscricao_id === s.id && ap.presente
        );
        alunosArray.push(
          this.fb.group({
            inscricao_id: [s.id],
            presente: [presenteMarcado || false],
            nome: [s.aluno.nome],
          })
        );
      });
    }

    const formGroup = this.fb.group({
      realizada_em: [f?.realizada_em || '', Validators.required],
      tempo_inicio: [f?.tempo_inicio || '', Validators.required],
      tempo_termino: [f?.tempo_termino || '', Validators.required],
      descricao: [f?.descricao || '', Validators.required],
      observacao: [f?.observacao || '', Validators.required],
      presencas: alunosArray,
    });

    if (f) {
      formGroup.disable();
    }

    return formGroup;
  }

  addSemana(f?: any): void {
    this.frequencias.push(this.loadForm(f));
    this.activeTab = this.frequencias.length - 1;
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
          this.frequencias.controls.forEach(ctrl => {
            const fg = ctrl as FormGroup;

            const formArray = this.fb.array(
              subs.map(s =>
                this.fb.group({
                  inscricao_id: [s.id],
                  presente: [false],
                  nome: [s.aluno.nome],
                })
              )
            );

            fg.setControl('presencas', formArray);
          });
        },
        error: err => console.error('Erro ao carregar inscrições', err),
      });
  }

  submit(): void {
    const formAtual = this.frequencias.at(this.activeTab) as FormGroup;

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
      presencas: alunosPresentes,
    };

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

  closeDialog(): void {
    this.visibleChange.emit(false);
  }

  get frequencias(): FormArray {
    return this.form.get('frequencias') as FormArray;
  }

  getControl<T = string>(tab: number, controlName: string): FormControl<T> {
    return (this.frequencias.at(tab) as FormGroup).get(
      controlName
    ) as FormControl<T>;
  }

  getAlunosArray(index: number): FormArray {
    return this.frequencias.at(index).get('presencas') as FormArray;
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
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
