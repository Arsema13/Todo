import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-edit-todo',
  standalone: false,
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent implements OnInit {
  todoForm: FormGroup;
  loading = true;
  saving = false;
  errorMessage = '';
  notFound = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.todoService.getTodoById(id).subscribe({
      next: (response) => {
        const todo = response.data;
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      },
    });
  }

  onSubmit(): void {
    if (this.todoForm.invalid) return;

    this.saving = true;
    this.errorMessage = '';

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const { title, description } = this.todoForm.value;

    this.todoService.updateTodo(id, title, description).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage =
          err.error?.message || 'Failed to update todo.';
      },
    });
  }

  get title() {
    return this.todoForm.get('title');
  }
}
