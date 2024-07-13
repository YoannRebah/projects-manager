import { Injectable, inject, signal } from "@angular/core";
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { User } from "../interfaces/user.interface";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    fireAuth = inject(Auth);
    user$ = user(this.fireAuth);
    currentUserSignal = signal<User | null | undefined>(undefined);
    _isAuthenticated = signal<boolean>(false);

    get isAuthenticated(): boolean {
        return this._isAuthenticated();
    }

    set isAuthenticated(value: boolean) {
        this._isAuthenticated.set(value);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.fireAuth,
            email,
            password
        ).then(() => {
            this.isAuthenticated = true;
        }).catch((e)=>{
            console.error('error login : ', e);
            throw e;
        });
        return from(promise);
    }

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.fireAuth,
            email,
            password
        ).then((resp) => { 
            updateProfile(resp.user, { displayName: username });
            this.isAuthenticated = true;
        }).catch((e)=>{
            console.error('error register : ', e);
            throw e;
        });
        return from(promise);
    }

    loginWithGoogle(): Observable<void> {
        const promise = signInWithPopup(
            getAuth(), new GoogleAuthProvider()
        ).then(async (result) => {
            this.currentUserSignal.set(result.user as unknown as User);
            this.isAuthenticated = true;
        }).catch((e)=>{
            console.error('error loginWithGoogle : ', e);
            throw e;
        });
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(
            getAuth()
        ).then(() => {
            this.isAuthenticated = false;
        }).catch((e)=>{
            console.error('error logout : ', e);
            throw e;
        });
        return from(promise);
    }
}