import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  private _loading: boolean = true;
  private _user: any = null;

  constructor(private authService: AuthService) {
    this.loadProfile();
  }

  async loadProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this._user = await this.authService.getUserData(currentUser.uid);
    }
    this._loading = false;
  }

  loading() {
    return this._loading;
  }

  user() {
    return this._user;
  }
}
