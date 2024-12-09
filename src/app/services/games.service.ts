import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private firestore: Firestore) { }

    // Method to add a new game to the Firestore
    addGame(game: any): Observable<void> {
        const gamesCollection = collection(this.firestore, 'games');
        return new Observable<void>((observer) => {
            addDoc(gamesCollection, game)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }

    // Method to get games from Firestore
    getGames(): Observable<any[]> {
        const gamesCollection = collection(this.firestore, 'games');
        return collectionData(gamesCollection, { idField: 'id' });
    }
}
