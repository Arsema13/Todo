import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoDeleted = new EventEmitter<void>();

  showConfirmDialog = false;

  constructor(private todoService: TodoService, private router: Router) {}

  confirmDelete(): void {
    this.showConfirmDialog = true;
  }

  onConfirmDelete(): void {
    this.showConfirmDialog = false;
    this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => {
        this.todoDeleted.emit();
      },
    });
  }

  onCancelDelete(): void {
    this.showConfirmDialog = false;
  }

  editTodo(): void {
    this.router.navigate(['/todos/edit', this.todo.id]);
  }
}
