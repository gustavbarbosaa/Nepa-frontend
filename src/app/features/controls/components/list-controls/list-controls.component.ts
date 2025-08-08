import { Component } from '@angular/core';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';

@Component({
  selector: 'app-list-controls',
  imports: [TableListItemsComponent],
  templateUrl: './list-controls.component.html',
  styleUrl: './list-controls.component.css',
})
export class ListControlsComponent {}
