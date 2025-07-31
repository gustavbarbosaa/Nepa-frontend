import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectStatus } from '@features/projects/enums/status.enum';
import { Checkbox } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TextAreaComponent } from '@shared/components/text-area/text-area.component';

@Component({
  selector: 'app-form-projects',
  imports: [
    StepperModule,
    ButtonModule,
    Checkbox,
    ChipsModule,
    ReactiveFormsModule,
    InputFormComponent,
    SelectFormComponent,
    TextAreaComponent,
  ],
  templateUrl: './form-projects.component.html',
  styleUrl: './form-projects.component.css',
})
export class FormProjectsComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  projectForm!: FormGroup;
  currentStep = signal<number>(1);
  statusOptions: WritableSignal<{ label: string; value: string }[]> = signal(
    []
  );

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      sumario: ['', Validators.required],
      status: ['PENDENTE', Validators.required],
      titulacao: ['', [Validators.required, Validators.maxLength(255)]],
      linha_de_pesquisa: ['', [Validators.required, Validators.maxLength(255)]],
      vagas_ocupadas: [0],
      vagas_totais: [0, Validators.min(1)],
      palavras_chave: [[], Validators.required],
      localizacao: ['', [Validators.required, Validators.maxLength(255)]],
      populacao: ['', [Validators.required, Validators.maxLength(255)]],
      objetivo_geral: ['', Validators.required],
      objetivo_especifico: ['', Validators.required],
      justificativa: ['', Validators.required],
      metodologia: ['', Validators.required],
      cronograma_atividades: ['', Validators.required],
      referencias: ['', Validators.required],
      aceitou_termos: [false, Validators.requiredTrue],
    });

    const optionsStatus = [
      ...Object.entries(ProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ];

    this.statusOptions.set(optionsStatus);
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.projectForm.get(controlName) as FormControl<T>;
  }

  private formatStatusLabel(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  submitForm(): void {
    if (this.projectForm.invalid) {
      console.log(this.projectForm);
      console.log('form invalido');
      return;
    }

    const formValueToSend = { ...this.projectForm.value };
    formValueToSend.palavras_chave = formValueToSend.palavras_chave.join(', ');
    formValueToSend.vagas_totais = Number(formValueToSend.vagas_totais);

    this.projectForm.markAllAsTouched();
    console.log('Dados do formulário:', formValueToSend);
  }
}
