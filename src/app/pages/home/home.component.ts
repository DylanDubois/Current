import { AuthService } from './../../providers/auth.service';
import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  allEvents: any;

  displaySignin: boolean = false;

  authState;

  user;

  constructor(private fbd : FirebaseService, public auth : AuthService) {
   }

  ngOnInit() {
    this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
    });
    this.authState = this.auth.getAuthState().subscribe((auth) =>{
      if (auth)
        this.user = auth;
    });
  }

  userLogout() {
    this.user = null;
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authState.unsubscribe();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }

  // chosenLocation(event): void {
  //   console.log(event);
  // }

}
