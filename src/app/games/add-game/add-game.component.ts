import { Component } from '@angular/core';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  gamesByCategory: { [key: string]: any[] } = {
    childrens: [],
    card: [],
    adventure: [],
    family: []
  };

  isLoading: boolean = false;

  constructor() { }

  // Add game method remains unchanged
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
      name,
      description,
      picture,
      condition,
      price: numericPrice,
      category
    };

    if (this.gamesByCategory[category]) {
      this.gamesByCategory[category].push(newGame);
    } else {
      console.error('Invalid category selected.');
    }

    console.log('Games by Category:', this.gamesByCategory);
  }
}

// Example: send the game object to a service or backend API
// this.gameService.addGame(newGame).subscribe(() => {
//   alert('Game added successfully!');
// });

