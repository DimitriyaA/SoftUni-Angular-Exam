import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService, Game } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories = ["Children's Games", "Card Games", "Adventure Games", "Family Games", "Strategy Games"];
  selectedCategory: string | null = null;
  gamesToDisplay$: Observable<Game[]>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.gamesToDisplay$ = this.gameService.getLatestGames();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      if (category && this.categories.includes(category)) {
        this.onCategorySelect(category);
      } else {
        this.loadLatestGames();
      }
    });
  }

  onCategorySelect(category: string): void {
    console.log(`Category selected: ${category}`); // Debugging
    this.selectedCategory = category;
    this.gamesToDisplay$ = this.gameService.getGamesByCategoryObservable(category);
  }

  loadLatestGames(): void {
    this.selectedCategory = null;
    this.gamesToDisplay$ = this.gameService.getLatestGames();
  }

  onMoreDetails(gameId: string): void {
    this.router.navigate(['/games/details', gameId]);
  }

  onDiscussion(gameId: string): void {
    this.router.navigate(['/games/discussion', gameId]);
  }
}
