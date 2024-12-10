import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service'; // Import the GameService

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  isLoading: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  addGame(
    event: Event,
    name: string,
    description: string,
    picture: string,
    condition: string,
    category: string,
    price: string
  ): void {
    event.preventDefault();

    const numericPrice = parseFloat(price);

    if (!name || !description || !picture || !condition || !category || isNaN(numericPrice)) {
      console.error('All fields are required, and price must be a valid number.');
      return;
    }

    const newGame = {
      name: 'New Game',
      description: 'This is a new game',
      picture: 'picture-url.jpg',
      condition: 'New',
      price: 50,
      category: 'Strategy'
    };

    // Call the GameService to add the new game to Firestore
    this.gameService.addGame(newGame).subscribe({
      next: () => console.log('Game added successfully!'),
      error: (err) => console.error('Error adding game:', err),
    });
  }
}
