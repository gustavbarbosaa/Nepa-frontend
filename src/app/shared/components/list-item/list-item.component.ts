import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  heroXMark,
  heroHome,
  heroUserGroup,
  heroArrowLeftOnRectangle,
  heroAcademicCap,
  heroClipboardDocumentList,
  heroFolder,
} from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-list-item',
  imports: [RouterLink, NgIcon],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  providers: [
    provideIcons({
      heroXMark,
      heroHome,
      heroUserGroup,
      heroArrowLeftOnRectangle,
      heroAcademicCap,
      heroClipboardDocumentList,
      heroFolder,
    }),
  ],
})
export class ListItemComponent {
  icon = input<string>();
  label = input.required<string>();
  link = input<string>();
  textVisible = input<boolean>(true);
}
