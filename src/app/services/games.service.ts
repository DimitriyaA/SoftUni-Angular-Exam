import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // This makes the service globally available
})
export class GameService {
    private gamesCollection = collection(this.firestore, 'games');

    constructor(private firestore: Firestore) { }

    getGames(): Observable<any[]> {
        return collectionData(this.gamesCollection, { idField: 'id' });
    }
}
