import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iCourse } from '@shared/models/course.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(): Observable<iCourse[]> {
    return this.http.get<iCourse[]>(`${this.apiUrl}/cursos/`).pipe(take(1));
  }
}
