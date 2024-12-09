import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  errorMessage: string = 'Sorry, page not found.'; // Добавено свойство
  constructor(public authService: AuthService) { }   // Инжектиране на AuthService
}
