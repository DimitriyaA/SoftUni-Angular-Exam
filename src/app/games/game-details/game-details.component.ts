import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/games.service';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add FormsModule and CommonModule here
  providers: [GameService],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailComponent implements OnInit {
  game: any = null; // To store the game details
  comments: any[] = []; // To store comments
  newComment: { name: string; text: string } = { name: '', text: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    const gameName = this.route.snapshot.paramMap.get('gameName');
    if (gameName) {
      this.loadGameDetails(gameName);
      this.loadComments(gameName);
    } else {
      this.router.navigate(['/404']);
    }
  }

  // Fetch game details from Firestore
  loadGameDetails(gameName: string): void {
    const gamesCollection = collection(this.firestore, 'games');
    collectionData(gamesCollection, { idField: 'id' }).subscribe((games) => {
      this.game = games.find((g) => g.name === gameName);
      if (!this.game) {
        this.router.navigate(['/404']);
      }
    });
  }

  // Fetch comments related to the current game
  loadComments(gameName: string): void {
    const commentsCollection = collection(this.firestore, `games/${gameName}/comments`);
    collectionData(commentsCollection, { idField: 'id' }).subscribe((data) => {
      this.comments = data;
    });
  }

  // Add a new comment to Firestore
  addComment(): void {
    if (this.newComment.text.trim()) {
      const commentsCollection = collection(this.firestore, `games/${this.game.name}/comments`);
      addDoc(commentsCollection, {
        user: this.authService.getCurrentUser()?.email || 'Anonymous',
        message: this.newComment.text.trim(),
        date: new Date().toISOString(),
      }).then(() => {
        this.newComment = { name: '', text: '' }; // Clear input fields
      });
    }
  }

  canEditGame(gameUserId: string): boolean {
    const user = this.authService.getCurrentUser();
    return user?.uid === gameUserId;
  }
}
