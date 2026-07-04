import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TodoService } from '../../services/todo.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  totalTodos = 0;
  loading = true;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.totalTodos = response.data.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
