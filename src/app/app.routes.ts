import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddGameComponent } from './games/add-game/add-game.component';
import { MainComponent } from './main/main.component';
import { DiscussionComponent } from './games/discussion/discussion.component';
import { CategoriesListComponent } from './games/categories-list/categories-list.component';
import { GameDetailComponent } from './games/game-details/game-details.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // Games routing

  { path: 'categories', component: CategoriesListComponent },
  { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameId/details', component: GameDetailComponent },
  { path: 'games/:gameId/comments', component: DiscussionComponent, canActivate: [AuthGuard] },


  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
