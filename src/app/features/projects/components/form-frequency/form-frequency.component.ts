import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { TextAreaComponent } from '@shared/components/text-area/text-area.component';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-form-frequency',
  imports: [Dialog, Button, InputFormComponent, TextAreaComponent],
  templateUrl: './form-frequency.component.html',
  styleUrl: './form-frequency.component.css',
})
export class FormFrequencyComponent implements OnInit {
  @Input({ required: true }) visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  private fb = inject(NonNullableFormBuilder);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      realizada_em: ['', [Validators.required]],
      tempo_inicio: ['', [Validators.required]],
      tempo_termino: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }
}
