import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: Game | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id'); // Четене на параметъра "id"
    if (gameId) {
      this.fetchGameDetails(gameId);
    } else {
      this.error = 'Game ID is missing.';
      this.isLoading = false;
    }
  }

  async fetchGameDetails(gameId: string): Promise<void> {
    try {
      this.game = await this.gameService.getGameById(gameId);
      this.isLoading = false;
    } catch (err) {
      this.error = 'Failed to load game details.';
      this.isLoading = false;
    }
  }
}
