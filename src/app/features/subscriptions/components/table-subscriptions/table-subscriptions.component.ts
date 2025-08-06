import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@core/services/toast/toast.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { StudentSignalService } from '@features/students/services/student-signal/student-signal.service';
import { StudentService } from '@features/students/services/student/student.service';
import { SubscriptionsService } from '@features/subscriptions/services/subscriptions/subscriptions.service';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iStudent } from '@shared/models/student.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-subscriptions',
  imports: [TableListItemsComponent],
  templateUrl: './table-subscriptions.component.html',
  styleUrl: './table-subscriptions.component.css',
  providers: [ToastService, MessageService],
})
export class TableSubscriptionsComponent implements OnInit {
  private projectService = inject(ProjectService);
  private studentService = inject(StudentService);
  private subscriptionsService = inject(SubscriptionsService);
  private studentSignalService = inject(StudentSignalService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  allStudents = signal<iStudent[]>([]);
  selectedStudent = signal<iStudent | null>(null);
  loading = signal<boolean>(false);
  combinedData: any[] = [];
  // combinedData: { user: iStudent; project: any; subscription: any }[] = [];

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchSubscriptionsWithDetails(projectId);
    } else {
      console.error('ID do projeto não encontrado na URL.');
    }
  }

  fetchSubscriptionsWithDetails(projectId: string): void {
    this.subscriptionsService
      .getAllByProject(projectId)
      .subscribe(s => (this.combinedData = s));
  }
}
