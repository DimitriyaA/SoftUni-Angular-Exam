import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddGameComponent } from './games/add-game/add-game.component';
import { MainComponent } from './main/main.component';
import { CurrentThemeComponent } from './games/current-theme/current-theme.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoriesListComponent } from './games/categories-list/categories-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  // Games routing
  {
    path: 'games',
    children: [
      { path: '', component: MainComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-game', component: AddGameComponent },

  { path: 'categories', component: CategoriesListComponent },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
