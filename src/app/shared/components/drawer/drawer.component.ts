import { ListItemComponent } from '@shared/components/list-item/list-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { LogoComponent } from '@shared/components/logo/logo.component';
import {
  Component,
  ViewChild,
  signal,
  WritableSignal,
  computed,
  Signal,
  OnInit,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { heroXMark, heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-drawer',
  imports: [
    DrawerModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    LogoComponent,
    NgIcon,
    DividerModule,
    ListItemComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  providers: [
    provideIcons({
      heroXMark,
      heroBars3,
    }),
  ],
})
export class DrawerComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }

  visible: WritableSignal<boolean> = signal(true);
  isVisible: Signal<boolean> = computed(() => this.visible());

  toggleVisible(): void {
    this.visible.update(prev => !prev);
  }

  items: {
    icon: string;
    label: string;
    routerLink: string;
    textVisible: boolean;
  }[] = [];

  ngOnInit(): void {
    this.items = [
      {
        icon: 'heroHome',
        label: 'Início',
        routerLink: '/',
        textVisible: this.isVisible(),
      },
      {
        icon: 'heroUserGroup',
        label: 'Alunos',
        routerLink: '/alunos',
        textVisible: this.isVisible(),
      },
      {
        icon: 'heroClipboardDocumentList',
        label: 'Editais',
        routerLink: '/editais',
        textVisible: this.isVisible(),
      },
      {
        icon: 'heroAcademicCap',
        label: 'Professores',
        routerLink: '/professores',
        textVisible: this.isVisible(),
      },
      {
        icon: 'heroFolder',
        label: 'Projetos',
        routerLink: '/projetos',
        textVisible: this.isVisible(),
      },
      {
        icon: 'heroArrowLeftOnRectangle',
        label: 'Sair',
        routerLink: '/logout',
        textVisible: this.isVisible(),
      },
    ];
  }
}
