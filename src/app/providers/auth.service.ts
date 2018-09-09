import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {

  }

  getAuthState() {
    return this.af.authState;
  }



  updateDisplayName(name : string) {
    this.af.auth.currentUser.updateProfile({displayName : name, photoURL: this.af.auth.currentUser.photoURL});
  }

  loginEmail(email: string, password: string) {

  }

  signInWithGoogle() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).catch((err) => console.log(err))
  }

  logout(path) {
    this.af.auth.signOut()
    .then((res) => this.router.navigate([path]));
  }
}


