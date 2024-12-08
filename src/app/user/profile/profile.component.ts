import { Component, OnInit, signal } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = signal<User | null>(null); // Signal to store the authenticated user
  loading = signal(true); // Signal for loading state

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user.set(user); // Update the user signal with the authenticated user
      this.loading.set(false); // Turn off the loading state
    });
  }
}
