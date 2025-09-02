import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-list-items',
  imports: [TableModule, NgTemplateOutlet],
  templateUrl: './table-list-items.component.html',
  styleUrl: './table-list-items.component.css',
})
export class TableListItemsComponent<T> {
  data = input.required<T[]>();
  loading = input.required<boolean>();

  @ContentChild('headerTable', { static: true })
  headerTable!: TemplateRef<unknown>;
  @ContentChild('bodyTable', { static: true }) bodyTable!: TemplateRef<unknown>;
}
