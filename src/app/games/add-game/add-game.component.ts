import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

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

    // Validate input values
    const allowedConditions = ['new', 'used-good', 'used-fair'] as const;

    if (
      !name ||
      !description ||
      !picture ||
      !condition ||
      !category ||
      isNaN(numericPrice) ||
      !allowedConditions.includes(condition as any) // Check if condition is valid
    ) {
      console.error(
        'All fields are required, price must be a valid number, and condition must be one of: new, used-good, used-fair.'
      );
      return;
    }

    // Create the new game object
    const newGame = {
      name: name,
      description: description,
      picture: picture,
      condition: condition as 'new' | 'used-good' | 'used-fair',
      price: numericPrice,
      category: category
    };

    this.isLoading = true;

    // Call GameService to add the new game
    this.gameService.addGame(newGame).subscribe({
      next: () => {
        console.log('Game added successfully!');
        this.isLoading = false;
        this.router.navigate(['/games']); // Redirect to the games page
      },
      error: (err) => {
        console.error('Error adding game:', err);
        this.isLoading = false;
      }
    });
  }
}
