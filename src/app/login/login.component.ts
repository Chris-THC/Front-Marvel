import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginFunction(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
