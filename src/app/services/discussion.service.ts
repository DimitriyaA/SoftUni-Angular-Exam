import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    collectionData,
    orderBy,
    query,
    serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getAuth, User } from '@angular/fire/auth';

// Comment interface for strong typing
export interface Comment {
    id?: string;         // Unique comment ID
    gameId: string;      // ID of the game the comment belongs to
    user: string;        // Name of the user who posted the comment
    message: string;     // Comment text content
    createdAt: Date;     // Timestamp when the comment was created
}

@Injectable({
    providedIn: 'root',
})
export class DiscussionService {
    constructor(private firestore: Firestore) { }

    /**
     * Fetch all comments for a specific game.
     * @param gameId The ID of the game to fetch comments for.
     * @returns An observable containing the list of comments ordered by creation date.
     */
    getComments(gameId: string): Observable<Comment[]> {
        const commentsCollection = collection(this.firestore, `discussion/${gameId}/comments`);
        const q = query(commentsCollection, orderBy('createdAt', 'asc')); // Sort comments oldest to newest
        return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
    }

    /**
     * Add a new comment under the specified game's discussion.
     * @param gameId The ID of the game to add a comment for.
     * @param message The comment text content.
     * @throws Error if the user is not logged in.
     */
    async addComment(gameId: string, message: string): Promise<void> {
        const auth = getAuth();
        const user: User | null = auth.currentUser;

        // Ensure the user is logged in
        if (!user) {
            throw new Error('You must be logged in to add a comment.');
        }

        // Use "Anonymous" if the display name is not set
        const username = user.displayName ? user.displayName : 'Anonymous';

        // Add the comment to the Firestore collection
        const commentsCollection = collection(this.firestore, `discussion/${gameId}/comments`);
        try {
            await addDoc(commentsCollection, {
                user: username,
                message: message,
                createdAt: serverTimestamp(), // Server-side timestamp
            });
            console.log(`✅ Comment added successfully for game: ${gameId}`);
        } catch (error: any) {
            console.error('❌ Error adding comment:', error.message);
            throw new Error('Failed to add the comment. Please try again.');
        }
    }
}
