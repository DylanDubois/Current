import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private af: AngularFireAuth,
    private router: Router) {

  }

  // retrieves current state of user authorization
  getAuthState() {
    return this.af.authState;
  }

  // changes user display name throughout application (not in use)
  updateDisplayName(name: string) {
    this.af.auth.currentUser.updateProfile({ displayName: name, photoURL: this.af.auth.currentUser.photoURL });
  }


  // redirects user to Google OAuth page
  signInWithGoogle() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).catch((err) => console.log(err))
  }

  // removes application authorization
  logout(path) {
    this.af.auth.signOut()
      .then((res) => this.router.navigate([path]));
  }
}


