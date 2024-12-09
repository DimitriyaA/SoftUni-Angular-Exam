import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        @Inject(getAuth) private afAuth: any, // Inject Firebase Auth instance
        @Inject(getFirestore) private firestore: any, // Inject Firestore instance
        private router: Router
    ) { }

    async register(email: string, password: string, username: string) {
        try {
            const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store user details in Firestore
            await this.firestore.collection('users').doc(user!.uid).set({
                email: user.email,
                username: username,
            });

            this.router.navigate(['/']);
        } catch (error: any) {
            console.error('Registration error:', error.message);
            throw error;
        }
    }
}
