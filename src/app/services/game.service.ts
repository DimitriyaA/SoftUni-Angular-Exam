import { Injectable } from '@angular/core';
import { DocumentReference, doc, collectionData, getDoc, deleteDoc, updateDoc, limit, addDoc } from '@angular/fire/firestore';
import { from, tap, Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { Firestore, collection, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';

interface GameDocument {
    id?: string;
    name: string;
    description: string;
    category: string;
    createdAt: Timestamp;
    price: number;
    condition: 'new' | 'used-good' | 'used-fair';
    picture: string;
    userId?: string;
}

export interface Game {
    id?: string;
    name: string;
    description: string;
    category: string;
    createdAt: Date;
    price: number;
    condition: 'new' | 'used-good' | 'used-fair';
    picture: string;
    userId?: string;
    sold?: boolean; // Add this property to track the sold state
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
        const game = gameDocSnap.data() as GameDocument;

        if (gameDocSnap.exists()) {
            return { id: gameId, ...game, createdAt: game.createdAt.toDate() }
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
       * @returns Observable<DocumentReference>
       */
    addGame(newGame: Partial<Game>): Observable<DocumentReference> {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User is not authenticated.');
        }

        const gamesCollection = collection(this.firestore, 'games');
        return from(
            addDoc(gamesCollection, {
                ...newGame,
                userId: user.uid, // Добавяме userId от текущия потребител
                createdAt: new Date(),
            })
        ).pipe(
            tap((ref) => console.log('Game added successfully with ID:', ref.id))
        );
    }


    async getGamesByCategory(category: string): Promise<Game[]> {
        const gamesCollection = collection(this.firestore, 'games');
        const q = query(gamesCollection, where('category', '==', category));

        const snapshot = await getDocs(q);
        console.log('Firestore Query Snapshot:', snapshot.docs); // Debug snapshot

        const games: Game[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log('Raw Game Data:', data); // Check for the picture field

            const createdAt = data['createdAt']
                ? new Date((data['createdAt'] as Timestamp).toMillis())
                : new Date();

            return {
                id: doc.id,
                name: data['name'] || 'Unknown',
                description: data['description'] || 'No description',
                category: data['category'] || 'Uncategorized',
                picture: data['picture'] || null, // Ensure picture field is returned
                createdAt: createdAt,
                price: data['price'] || 0,
                condition: data['condition'] || 'unknown',
            } as Game;
        });

        console.log('Mapped Games:', games);
        return games.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    getGamesByCategoryObservable(category: string): Observable<Game[]> {
        return from(this.getGamesByCategory(category)).pipe(
            tap((games) => {
                console.log(`Games fetched for category "${category}":`, games);
            })
        );
    }

    async updateGameDetails(gameId: string, updatedData: Partial<Game>): Promise<void> {
        const gameRef = doc(this.firestore, `games/${gameId}`);
        await updateDoc(gameRef, updatedData);
    }

    /**
   * Mark a game as sold.
   */
    async markGameAsSold(gameId: string): Promise<void> {
        const gameRef = doc(this.firestore, `games/${gameId}`);
        await updateDoc(gameRef, { sold: true }); // Only update 'sold'
    }


    /**
     * Delete a game.
     */
    async deleteGame(gameId: string): Promise<void> {
        const gameRef = doc(this.firestore, `games/${gameId}`);
        await deleteDoc(gameRef);
    }
}
