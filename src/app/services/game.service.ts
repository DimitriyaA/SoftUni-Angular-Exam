import { Injectable } from '@angular/core';
import { doc, collectionData, getDoc, limit, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Firestore, collection, query, where, getDocs, orderBy } from '@angular/fire/firestore';


export interface Game {
    id?: string;        // Optional when creating a new game
    name: string;
    description: string;
    category: string;
    createdAt: Date;    // Use a specific Date type for createdAt
}

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private firestore: Firestore) { }

    /**
     * Fetch all games from Firestore.
     */
    getGames(): Observable<Game[]> {
        const gamesCollection = collection(this.firestore, 'games');
        return collectionData(gamesCollection, { idField: 'id' }) as Observable<Game[]>;
    }

    /**
     * Fetch the latest games from Firestore.
     */
    getLatestGames(): Observable<Game[]> {
        const gamesCollection = collection(this.firestore, 'games');
        const q = query(gamesCollection, orderBy('createdAt', 'desc'), limit(5)); // Fetch latest 5 games
        return collectionData(q, { idField: 'id' }) as Observable<Game[]>;
    }

    /**
     * Fetch details for a single game by its ID.
     * @param gameId The ID of the game document.
     */
    async getGameById(gameId: string): Promise<Game> {
        const gameDocRef = doc(this.firestore, `games/${gameId}`);
        const gameDocSnap = await getDoc(gameDocRef);

        if (gameDocSnap.exists()) {
            return { id: gameId, ...gameDocSnap.data() } as Game;
        } else {
            throw new Error('Game not found.');
        }
    }

    /**
     * Fetch comments/discussions for a specific game.
     * @param gameId The ID of the game document.
     */
    getGameDiscussions(gameId: string): Observable<any[]> {
        const commentsCollection = collection(this.firestore, `games/${gameId}/comments`);
        const q = query(commentsCollection, orderBy('createdAt', 'desc'));
        return collectionData(q, { idField: 'id' });
    }

    /**
     * Fetch games by category.
     * @param category The category name.
     */




    /**
     * Add a new game to Firestore.
     * @param newGame The game data to be added.
     * @returns Observable<void>
     */
    addGame(newGame: Partial<Game>): Observable<void> {
        const gamesCollection = collection(this.firestore, 'games');
        return new Observable((observer) => {
            addDoc(gamesCollection, {
                ...newGame,
                createdAt: new Date() // Automatically assign createdAt
            })
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }
}
