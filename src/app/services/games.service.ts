import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    gamesCollection: Observable<any[]>

    constructor(private firestore: Firestore) {
        const gamesCollection = collection(this.firestore, 'games')
        this.gamesCollection = collectionData(gamesCollection)
    }

    getGames() {
        return this.gamesCollection
    }
}