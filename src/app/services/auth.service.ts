import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        @Inject(getAuth) private afAuth: Auth, // Firebase Auth instance
        @Inject(Firestore) private firestore: Firestore, // Firestore instance
        private router: Router
    ) { }

    // Регистрация
    async register(email: string, password: string, username: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
            const user = userCredential.user;

            // Запазване на потребителските данни във Firestore
            await setDoc(doc(this.firestore, 'users', user.uid), {
                email: user.email,
                username: username
            });

            this.router.navigate(['/profile']);
        } catch (error: any) {
            console.error('Registration error:', error.message);
            throw error;
        }
    }

    // Вход
    async login(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(this.afAuth, email, password);
            this.router.navigate(['/profile']);
        } catch (error: any) {
            console.error('Login error:', error.message);
            throw error;
        }
    }

    // Проверка за автентикация
    isLoggedIn(): boolean {
        return !!this.afAuth.currentUser;
    }

    // Извличане на текущ потребител
    getCurrentUser() {
        return this.afAuth.currentUser;
    }

    // Потребителски данни от Firestore
    async getUserData(uid: string) {
        const userRef = doc(this.firestore, 'users', uid);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : null;
    }

    // Изход
    async logout() {
        await signOut(this.afAuth);
        this.router.navigate(['/home']);
    }
}
