import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = null; // Holds the user profile data
  errorMessage: string = ''; // Error message for failures
  loading: boolean = true; // Indicates loading state

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.authService.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          this.userData = user; // Directly fetch user data
        } catch (error: any) {
          this.errorMessage = 'Failed to load profile data.';
        }
      } else {
        // Redirect to login if user is not authenticated
        this.router.navigate(['/login']);
      }
      this.loading = false;
    });
  }
}
