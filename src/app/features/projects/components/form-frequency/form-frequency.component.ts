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
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { TextAreaComponent } from '@shared/components/text-area/text-area.component';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TabPanel, TabsModule } from 'primeng/tabs';

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
  ],
  templateUrl: './form-frequency.component.html',
  styleUrl: './form-frequency.component.css',
})
export class FormFrequencyComponent implements OnInit {
  @Input({ required: true }) visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  private fb = inject(NonNullableFormBuilder);

  forms: { [key: number]: FormGroup } = {};
  activeTab = 1;

  ngOnInit(): void {
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

  submit(): void {
    const formAtual = this.forms[this.activeTab];

    console.log(formAtual);

    if (formAtual.invalid) {
      formAtual.markAllAsTouched();
      return;
    }

    const payload = formAtual.value;
    console.log(payload);
    this.closeDialog();
  }

  getControl<T = string>(tab: number, controlName: string): FormControl<T> {
    return this.forms[tab].get(controlName) as FormControl<T>;
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }
}
