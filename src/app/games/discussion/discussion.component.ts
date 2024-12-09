import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Важно за @if и @for

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit {
  comments: Array<{ user: string; message: string; date: string }> = [];

  newComment: { name: string; text: string } = { name: '', text: '' };

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.comments = [
      { user: 'Alice', message: 'Test comment', date: '2024-06-02' }
    ];
  }

  loadComments(): void {
    // Примерни данни за коментари
    this.comments = [
      { user: 'Alice', message: 'Great game!', date: '2024-06-01' },
      { user: 'Charlie', message: 'Enjoyed playing this.', date: '2024-06-02' },
    ];
  }

  addComment(): void {
    if (this.newComment.text.trim()) {
      this.comments.push({
        user: this.newComment.name || 'Anonymous',
        message: this.newComment.text.trim(),
        date: new Date().toISOString(),
      });
      this.newComment = { name: '', text: '' };
    }
  }
}
