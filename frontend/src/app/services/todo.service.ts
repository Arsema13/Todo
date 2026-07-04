import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createTodo(title: string, description: string): Observable<ApiResponse<Todo>> {
    return this.http.post<ApiResponse<Todo>>(`${this.apiUrl}/todo/create`, {
      title,
      description,
    });
  }

  getTodos(): Observable<ApiResponse<Todo[]>> {
    return this.http.get<ApiResponse<Todo[]>>(`${this.apiUrl}/todo/get_all`);
  }

  getTodoById(id: number): Observable<ApiResponse<Todo>> {
    return this.http.get<ApiResponse<Todo>>(`${this.apiUrl}/todo/get/${id}`);
  }

  updateTodo(id: number, title: string, description: string): Observable<ApiResponse<Todo>> {
    return this.http.put<ApiResponse<Todo>>(`${this.apiUrl}/todo/update/${id}`, {
      title,
      description,
    });
  }

  deleteTodo(id: number): Observable<ApiResponse<Todo>> {
    return this.http.delete<ApiResponse<Todo>>(`${this.apiUrl}/todo/delete/${id}`);
  }

  deleteAllTodos(): Observable<ApiResponse<Todo[]>> {
    return this.http.delete<ApiResponse<Todo[]>>(`${this.apiUrl}/todo/delete_all`);
  }
}
