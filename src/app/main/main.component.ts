import { Component } from '@angular/core';
import { CategoriesListComponent } from '../games/categories-list/categories-list.component';
import { UserService } from '../user/user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CategoriesListComponent, HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) { }
}
