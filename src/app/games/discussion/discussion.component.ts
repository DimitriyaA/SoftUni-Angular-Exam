import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    { user: 'Pesho', message: 'The gameplay is so fun. Family time well spend!' },
    { user: 'Vanko', message: 'I’m not a fan of the game, too complex.' },
  ];

  newComment = { name: '', text: '' };

  addComment(): void {
    if (this.newComment.name.trim() && this.newComment.text.trim()) {
      this.comments.push({ user: this.newComment.name, message: this.newComment.text });
      this.newComment = { name: '', text: '' }; // Reset form
    }
  }
}
