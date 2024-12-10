import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService, Game } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = ['Action', 'Strategy', 'RPG', 'Adventure', 'Sports'];
  selectedCategory: string | null = null;
  gamesToDisplay$: Observable<Game[]>;

  constructor(private gameService: GameService, private router: Router) {
    // Initialize gamesToDisplay$
    this.gamesToDisplay$ = this.gameService.getLatestGames();
  }

  ngOnInit(): void {
    this.loadLatestGames();
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.gamesToDisplay$ = this.gameService.getGamesByCategoryObservable(category);
  }

  loadLatestGames(): void {
    this.selectedCategory = null;
    this.gamesToDisplay$ = this.gameService.getLatestGames();
  }

  // Navigate to game details page
  onMoreDetails(gameId: string): void {
    this.router.navigate(['/games/details', gameId]); // Matches 'games/details/:id'
  }

  // Navigate to discussion page for a game
  onDiscussion(gameId: string): void {
    this.router.navigate(['/games/discussion', gameId]); // Matches 'games/discussion/:id'
  }
}
