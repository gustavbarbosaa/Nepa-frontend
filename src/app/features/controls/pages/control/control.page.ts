import { Component } from '@angular/core';
import { HeaderControlComponent } from '@features/controls/components/header-control/header-control.component';

@Component({
  selector: 'app-control',
  imports: [HeaderControlComponent],
  templateUrl: './control.page.html',
  styleUrl: './control.page.css',
})
export class ControlPage {}
