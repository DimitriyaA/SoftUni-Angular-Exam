import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = ''; // User's email
  password: string = ''; // User's password
  rePassword: string = ''; // Re-entered password
  username: string = ''; // Username
  errorMessage: string = ''; // Error message placeholder

  constructor(private authService: AuthService, private router: Router) { }

  // Handles the user registration
  async onRegister() {
    this.errorMessage = '';

    // Input validation
    if (!this.email || !this.password || !this.rePassword || !this.username) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.password !== this.rePassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.username);
      console.log('Registration successful!');
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
