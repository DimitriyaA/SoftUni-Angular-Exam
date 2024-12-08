import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Firebase Auth instance
  private auth = getAuth();

  // Signal for form feedback messages
  errorMessage = signal<string | null>(null);

  // Reactive Form
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Please fill in all fields correctly.');
      return;
    }

    const { email, password, rePassword } = this.registerForm.value;

    if (password !== rePassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(this.auth, email!, password!);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Registration failed.');
    }
  }
}
