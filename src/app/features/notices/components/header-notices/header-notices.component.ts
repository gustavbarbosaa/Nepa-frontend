import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormNoticeComponent } from '../form-notice/form-notice.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NoticeSignalService } from '@features/notices/services/notice-signal/notice-signal.service';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';
import { TokenService } from '@core/services/token/token.service';
import { eAutoridade } from '@shared/enums/autoridade.enum';

@Component({
  selector: 'app-header-notices',
  imports: [
    Dialog,
    ButtonModule,
    FormNoticeComponent,
    InputFormComponent,
    SelectFormComponent,
    TitleHeaderListComponent,
  ],
  standalone: true,
  templateUrl: './header-notices.component.html',
  styleUrl: './header-notices.component.css',
})
export class HeaderNoticesComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private noticeServiceSignal = inject(NoticeSignalService);
  private tokenService = inject(TokenService);

  userInfo = signal(this.tokenService.getNameAndTypeUserForToken());
  autoridade = eAutoridade;
  fileFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);
  visible: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterName: ['', [Validators.nullValidator]],
      filterFile: [''],
    });

    this.fileFilter.set([
      { label: 'Todos', value: '' },
      { label: 'Com arquivo', value: 'com_arquivo' },
      { label: 'Sem Arquivo', value: 'sem_arquivo' },
    ]);

    this.form.valueChanges.subscribe(value => {
      this.noticeServiceSignal.filterName.set(value.filterName);
      this.noticeServiceSignal.filterFile.set(value.filterFile);
    });
  }

  showDialog(): void {
    this.visible = true;
  }

  onSuccessRegister(): void {
    this.visible = false;
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
