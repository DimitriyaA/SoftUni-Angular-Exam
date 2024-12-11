import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup; // Reactive form for login
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize form with unified input for email or username
    this.loginForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]], // Accepts email or username
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    // Exit early if form is invalid
    if (this.loginForm.invalid) return;

    const { emailOrUsername, password } = this.loginForm.value;

    try {
      // Use the AuthService to handle login
      await this.authService.login(emailOrUsername, password);
      // Redirect to the home page on successful login
      this.router.navigate(['/home']);
    } catch (error: any) {
      // Display a user-friendly error message
      this.errorMessage = error.message || 'An error occurred. Please try again.';
      console.error('Login error:', error.message);
    }

  }
}
