import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any;
  user: any;

  constructor(private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {

    af.authState.subscribe((auth) => {
      this.authState = auth;
      this.user = this.authState;
    });
  }

  authenticated(): boolean {
    return this.authState !== null;
  }

  currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user UID
  currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  loginEmail(email: string, password: string) {

  }

  signInWithGoogle() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  logout() {
    this.af.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}


