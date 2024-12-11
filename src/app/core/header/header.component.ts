import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  firstName: string | null = null; // Added firstName property

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      this.username = user?.displayName || null;

      // Extract the first name if displayName exists
      this.firstName = this.username;
    });
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}