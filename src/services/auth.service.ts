import { Injectable, inject, signal } from "@angular/core";
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { User } from "../interfaces/user.interface";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSignal = signal<User | null | undefined>(undefined);

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then((resp)=> { 
            updateProfile(resp.user, {displayName: username}) 
        });
        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(()=> {});
        return from(promise);
    }

    loginWithGoogle(): Observable<void> {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const promise = signInWithPopup(auth, provider).then((result) => {
            this.currentUserSignal.set(result.user as unknown as User);
        });
        return from(promise);
    }

    registerWithGoogle(): Observable<void> {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const promise = signInWithPopup(auth, provider).then(async (result) => {
            const user = result.user;
            const username = user.displayName || user.email?.split('@')[0] || 'Google User';
            await updateProfile(user, { displayName: username });
        });
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }  
}