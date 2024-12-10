import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  comments: { text: string; createdAt: Date }[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.loadComments();
  }

  loadComments(): void {
    // Replace with real logic to fetch comments
    this.comments = [
      { text: 'Great game!', createdAt: new Date() },
      { text: 'Loved it!', createdAt: new Date() },
    ];
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({ text: this.newComment, createdAt: new Date() });
      this.newComment = '';
    }
  }
}
