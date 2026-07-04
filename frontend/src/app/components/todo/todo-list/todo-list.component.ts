import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  loading = true;
  searchTerm = '';
  showConfirmDialog = false;
  confirmMessage = '';

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response.data;
        this.filteredTodos = [...this.todos];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredTodos = [...this.todos];
      return;
    }
    this.filteredTodos = this.todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(term) ||
        (todo.description && todo.description.toLowerCase().includes(term))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  confirmDeleteAll(): void {
    this.confirmMessage = 'Are you sure you want to delete ALL todos? This cannot be undone.';
    this.showConfirmDialog = true;
  }

  onConfirmDeleteAll(): void {
    this.showConfirmDialog = false;
    this.loading = true;
    this.todoService.deleteAllTodos().subscribe({
      next: () => {
        this.loadTodos();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onCancelDialog(): void {
    this.showConfirmDialog = false;
  }

  onTodoDeleted(): void {
    this.loadTodos();
  }
}
