import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: Game | null = null;
  isLoading = true;
  error: string | null = null;
  currentUserId: string | null = null;
  editMode = false; // Toggle for edit mode
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      condition: [''],
      picture: [''],
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.uid || null;
    const gameId = this.route.snapshot.paramMap.get('id');
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
      if (this.game) {
        this.editForm.patchValue({
          name: this.game.name,
          description: this.game.description,
          price: this.game.price,
          condition: this.game.condition,
        });
      }
    } catch (err) {
      this.error = 'Failed to load game details.';
    } finally {
      this.isLoading = false;
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  async saveUpdates(): Promise<void> {
    if (!this.game?.id) return;
    try {
      const updatedData = this.editForm.value;
      await this.gameService.updateGameDetails(this.game.id, updatedData);
      this.game = { ...this.game, ...updatedData };
      this.editMode = false;
    } catch (err) {
      console.error('Error updating game:', err);
      this.error = 'Failed to update game.';
    }
  }

  async markAsSold(): Promise<void> {
    if (!this.game?.id) return;
    try {
      await this.gameService.markGameAsSold(this.game.id);
      this.game.sold = true;
    } catch (err) {
      console.error('Error marking game as sold:', err);
      this.error = 'Failed to mark game as sold.';
    }
  }

  async deleteGame(): Promise<void> {
    if (!this.game?.id) return;
    try {
      await this.gameService.deleteGame(this.game.id);
      this.router.navigate(['/games']);
    } catch (err) {
      console.error('Error deleting game:', err);
      this.error = 'Failed to delete game.';
    }
  }
}
