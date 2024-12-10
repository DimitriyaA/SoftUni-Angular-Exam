import { Injectable } from '@angular/core';
import { doc, collectionData, getDoc, limit, addDoc } from '@angular/fire/firestore';
import { from, tap, Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { Firestore, collection, query, where, getDocs, orderBy } from '@angular/fire/firestore';


export interface Game {
    id?: string;
    name: string;
    description: string;
    category: string;
    createdAt: Date;
    price: number;
    condition: 'new' | 'used-good' | 'used-fair';
    picture: string; // URL
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

    async getGamesByCategory(category: string): Promise<Game[]> {
        const gamesCollection = collection(this.firestore, 'games');
        const q = query(gamesCollection, where('category', '==', category));

        const snapshot = await getDocs(q);
        console.log('Firestore Query Snapshot:', snapshot.docs);

        const games: Game[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data['createdAt']
                ? new Date((data['createdAt'] as Timestamp).toMillis())
                : new Date();

            return {
                id: doc.id,
                name: data['name'] || 'Unknown',
                description: data['description'] || 'No description',
                category: data['category'] || 'Uncategorized',
                createdAt: createdAt,
            } as Game;
        });

        console.log('Mapped Games:', games);
        return games.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    getGamesByCategoryObservable(category: string): Observable<Game[]> {
        return from(this.getGamesByCategory(category)).pipe(
            tap((games) => console.log('Games fetched for category:', category, games))
        );
    }
}
