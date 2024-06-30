import { Injectable, inject, signal } from "@angular/core";
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { User } from "../../models/user.interface";
import { signOut } from "firebase/auth";

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

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }
}