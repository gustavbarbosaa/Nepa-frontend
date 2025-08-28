import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { SubscriptionsSignalService } from '@features/subscriptions/services/subscriptionSignal/subscriptions-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';
import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header-subscriptions',
  imports: [InputFormComponent, SelectFormComponent, TitleHeaderListComponent],
  templateUrl: './header-subscriptions.component.html',
  styleUrl: './header-subscriptions.component.css',
})
export class HeaderSubscriptionsComponent implements OnInit {
  form!: FormGroup;

  private fb = inject(NonNullableFormBuilder);
  private subscriptionSignalService = inject(SubscriptionsSignalService);

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      filterName: ['', [Validators.nullValidator]],
      filterStatus: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      ...Object.entries(eStatusInscricaoProjeto).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);

    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(({ filterName, filterStatus }) => {
        this.subscriptionSignalService.filterName.set(filterName || '');
        this.subscriptionSignalService.filterStatus.set(filterStatus || '');
      });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  private formatStatusLabel(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
