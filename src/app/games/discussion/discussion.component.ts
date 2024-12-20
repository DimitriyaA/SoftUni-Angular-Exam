import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent {
  comments: { user: string; message: string }[] = [
    { user: 'Petyo', message: 'I absolutely love this game!' },
    { user: 'Pesho', message: 'The gameplay is so fun. Family time well spent!' },
    { user: 'Vanko', message: 'I’m not a fan of the game, too complex.' },
  ];

  newComment = { name: '', text: '' };

  // Use the AuthService to check if the user is logged in
  authService = inject(AuthService);
  isLoggedIn: boolean = this.authService.isLoggedIn();

  addComment(): void {
    if (this.newComment.name.trim() && this.newComment.text.trim()) {
      this.comments.push({ user: this.newComment.name, message: this.newComment.text });
      this.newComment = { name: '', text: '' }; // Reset form
    }
  }
}