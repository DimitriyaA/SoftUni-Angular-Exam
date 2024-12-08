import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private auth = getAuth(); // Firebase Auth instance
  errorMessage = signal<string | null>(null); // Signal for error messages

  constructor(private router: Router) { }

  async login(event: Event, email: string, password: string) {
    event.preventDefault(); // Prevent form submission from reloading the page

    if (!email || !password) {
      this.errorMessage.set('Please fill in both fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.errorMessage.set(null); // Clear any previous errors
      this.router.navigate(['/home']); // Redirect to home page
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Login failed. Please try again.');
    }
  }
}
