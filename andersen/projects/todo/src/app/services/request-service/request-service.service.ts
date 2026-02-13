import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BASE_URL } from '@env';
import { Todo, UpdateSubTask } from '../../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestServiceTodo {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = inject(BASE_URL);

  private readonly headers = {
    headers: new HttpHeaders({
      'T-Auth': '81e64638-c74b-401f-b227-f779c2e8e301',
    }),
  };

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todo`, this.headers);
  }

  addTodo(name: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo`, { name }, this.headers);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/todo?id=${id}`, this.headers);
  }

  createSubTask(id: string, name: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo/task?id=${id}`, { name }, this.headers);
  }

  deleteSubTask(todoId: string, taskId: string): Observable<Todo> {
    return this.http.delete<Todo>(
      `${this.apiUrl}/todo/task?id=${todoId}&task-id=${taskId}`,
      this.headers,
    );
  }

  updateSubTask(todoId: string, taskId: string, payload: UpdateSubTask): Observable<Todo> {
    return this.http.post<Todo>(
      `${this.apiUrl}/todo/edit-task?id=${todoId}&task-id=${taskId}`,
      payload,
      this.headers,
    );
  }
}
