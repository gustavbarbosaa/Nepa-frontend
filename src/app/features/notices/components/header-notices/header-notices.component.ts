import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { FormNoticeComponent } from '../form-notice/form-notice.component';

@Component({
  selector: 'app-header-notices',
  imports: [Dialog, ButtonModule, FormNoticeComponent, NgClass],
  standalone: true,
  templateUrl: './header-notices.component.html',
  styleUrl: './header-notices.component.css',
})
export class HeaderNoticesComponent {
  visible: boolean = false;

  showDialog(): void {
    this.visible = true;
  }

  onSuccessRegister(): void {
    this.visible = false;
  }
}
