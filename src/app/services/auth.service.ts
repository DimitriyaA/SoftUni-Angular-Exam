import { Injectable, inject } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    UserCredential,
    User,
    signOut,
} from '@angular/fire/auth';
import {
    Firestore,
    collection,
    doc,
    getDocs,
    query,
    where,
    limit,
} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = inject(Auth); // Firebase Authentication instance
    private firestore = inject(Firestore); // Firestore instance for user data

    /**
     * Register a new user and set their username in displayName.
     * @param email User email
     * @param password User password
     * @param username User's display name
     */
    async register(email: string, password: string, username: string): Promise<void> {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            const user = userCredential.user;

            // Set the displayName (username) for the user in Firebase Authentication
            await updateProfile(user, { displayName: username });

            console.log('User registered successfully with username:', username);
        } catch (error: any) {
            console.error('Registration error:', error.message);
            throw error;
        }
    }

    /**
     * Log in an existing user using email or username and password.
     * @param emailOrUsername User's email or username
     * @param password User password
     */
    async login(emailOrUsername: string, password: string): Promise<void> {
        try {
            let email = emailOrUsername;

            // If input is a username (no '@'), fetch the corresponding email from Firestore
            if (!emailOrUsername.includes('@')) {
                const usersCollection = collection(this.firestore, 'users');
                const q = query(
                    usersCollection,
                    where('username', '==', emailOrUsername),
                    limit(1) // Enforce single result
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error('No user found with that username.');
                }

                // Extract the email field
                const userDoc = querySnapshot.docs[0];
                email = userDoc.data()['email'];

                console.log(`Fetched email for username "${emailOrUsername}": ${email}`);
            }

            // Log in with the resolved email and password
            await signInWithEmailAndPassword(this.auth, email, password);
            console.log('Login successful!');
        } catch (error: any) {
            console.error('Login error:', error.message);
            throw error;
        }
    }
    /**
     * Check if the user is logged in.
     * @returns Boolean indicating if a user is logged in
     */
    isLoggedIn(): boolean {
        return !!this.auth.currentUser;
    }

    /**
     * Subscribe to authentication state changes.
     * @param callback A callback function to handle state changes
     */
    onAuthStateChanged(callback: (user: User | null) => void): void {
        this.auth.onAuthStateChanged(callback);
    }

    /**
     * Log out the current user.
     */
    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
            console.log('User logged out successfully.');
        } catch (error: any) {
            console.error('Logout error:', error.message);
            throw error;
        }
    }

    /**
  * Get the currently logged-in user.
  * @returns The current user or null if not logged in
  */
    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }
}
