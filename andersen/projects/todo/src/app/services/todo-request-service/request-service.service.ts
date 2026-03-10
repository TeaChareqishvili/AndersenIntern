import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { Todo, UpdateSubTask } from '../../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestServiceTodo {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = inject(BASE_URL);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todo`);
  }

  addTodo(name: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo`, { name });
  }

  deleteTodo(id: string, name: string): Observable<Todo> {
    const params = new HttpParams().set('id', id).set('name', name);
    return this.http.delete<Todo>(`${this.apiUrl}/todo`, { params });
  }

  createSubTask(id: string, name: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo/task?id=${id}`, { name });
  }

  deleteSubTask(todoId: string, taskId: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/todo/task?id=${todoId}&task-id=${taskId}`);
  }

  updateSubTask(todoId: string, taskId: string, payload: UpdateSubTask): Observable<Todo> {
    return this.http.post<Todo>(
      `${this.apiUrl}/todo/edit-task?id=${todoId}&task-id=${taskId}`,
      payload,
    );
  }
}
