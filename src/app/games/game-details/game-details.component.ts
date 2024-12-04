import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-game-detail',
  standalone: true,  // This makes this component standalone
  imports: [CommonModule, FormsModule],  // Add CommonModule and FormsModule to imports
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailComponent implements OnInit {
  game: any;  // To store the selected game details
  comments: { user: string; message: string; date: string }[] = []; // Updated to include 'date' property
  gameName: string = ''; // The name of the game from the URL
  newComment: string = ''; // Variable to bind the new comment input

  // Mock data for games
  games = [
    { name: 'Game 1', description: 'A fun game for everyone.', picture: 'game1.jpg', condition: 'New', price: 10, category: 'Card Games' },
    { name: 'Game 2', description: 'Exciting adventure gameplay.', picture: 'game2.jpg', condition: 'Used', price: 15, category: 'Adventure Games' },
    // Add all your game data here
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the game name from the URL and fetch the game details
    this.route.paramMap.subscribe(params => {
      const gameName = params.get('gameName');
      if (gameName) {
        this.gameName = gameName;
        this.getGameDetails(gameName);  // Fetch game details
        this.loadComments();  // Optionally, load comments for this game
      }
    });
  }

  // Fetch game details by name
  getGameDetails(gameName: string): void {
    this.game = this.games.find(game => game.name.toLowerCase() === gameName.toLowerCase().trim());
    if (!this.game) {
      // Handle the case where the game is not found (e.g., show an error message)
      console.error('Game not found');
    }
  }

  // Load comments for this game (you can mock or fetch from a service)
  loadComments(): void {
    // Mock comments with a 'date' property
    this.comments = [
      { user: 'Alice', message: 'This is amazing!', date: '2024-12-04' },
      { user: 'Bob', message: 'I like the gameplay.', date: '2024-12-03' },
    ];
  }

  // Add new comment
  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({ user: 'Anonymous', message: this.newComment.trim(), date: new Date().toISOString() });
      this.newComment = ''; // Reset the input field after adding the comment
    }
  }
}
