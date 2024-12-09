import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private firestore: Firestore, private auth: Auth) { }

    // Add a new game to the Firestore collection
    addGame(game: any): Observable<void> {
        const gamesCollection = collection(this.firestore, 'games');
        return new Observable<void>((observer) => {
            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    game.userId = user.uid; // Assign the current user's ID as the game creator
                    addDoc(gamesCollection, game)
                        .then(() => {
                            observer.next();
                            observer.complete();
                        })
                        .catch((error) => {
                            observer.error(error);
                        });
                } else {
                    observer.error('Unauthorized');
                }
            });
        });
    }

    // Retrieve all games from the Firestore
    getGames(): Observable<any[]> {
        const gamesCollection = collection(this.firestore, 'games');
        return collectionData(gamesCollection, { idField: 'id' });
    }

    // Update a game (allowed only for the creator of the game)
    updateGame(gameId: string, gameData: any): Observable<void> {
        return new Observable<void>((observer) => {
            const gameDocRef = doc(this.firestore, `games/${gameId}`);
            this.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const gameSnap = await getDoc(gameDocRef);
                    if (gameSnap.exists() && gameSnap.data()?.['userId'] === user.uid) {
                        updateDoc(gameDocRef, gameData)
                            .then(() => {
                                observer.next();
                                observer.complete();
                            })
                            .catch((error) => observer.error(error));
                    } else {
                        observer.error('Permission Denied');
                    }
                } else {
                    observer.error('Unauthorized');
                }
            });
        });
    }

    // Delete a game (allowed only for the creator of the game)
    deleteGame(gameId: string): Observable<void> {
        return new Observable<void>((observer) => {
            const gameDocRef = doc(this.firestore, `games/${gameId}`);
            this.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const gameSnap = await getDoc(gameDocRef);
                    if (gameSnap.exists() && gameSnap.data()?.['userId'] === user.uid) {
                        deleteDoc(gameDocRef)
                            .then(() => {
                                observer.next();
                                observer.complete();
                            })
                            .catch((error) => observer.error(error));
                    } else {
                        observer.error('Permission Denied');
                    }
                } else {
                    observer.error('Unauthorized');
                }
            });
        });
    }
}
