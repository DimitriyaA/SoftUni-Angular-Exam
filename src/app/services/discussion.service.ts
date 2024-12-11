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
import { getAuth } from '@angular/fire/auth';

export interface Comment {
    id?: string;
    gameId: string;
    user: string;
    message: string;
    createdAt: Date;
}

@Injectable({
    providedIn: 'root',
})
export class DiscussionService {
    constructor(private firestore: Firestore) { }

    /**
     * Fetch comments for a specific game from Firestore
     * @param gameId The ID of the game
     */
    getComments(gameId: string): Observable<Comment[]> {
        const commentsCollection = collection(this.firestore, `discussion/${gameId}/comments`);
        const q = query(commentsCollection, orderBy('createdAt', 'asc'));
        return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
    }

    /**
     * Add a new comment to Firestore under the specific game's discussion
     * @param gameId The ID of the game
     * @param message The comment message
     */
    async addComment(gameId: string, message: string): Promise<void> {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) throw new Error('You must be logged in to add a comment.');

        const commentsCollection = collection(this.firestore, `discussion/${gameId}/comments`);
        await addDoc(commentsCollection, {
            user: user.displayName || 'Anonymous',
            message: message,
            createdAt: serverTimestamp(),
        });
    }
}
