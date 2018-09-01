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
      console.log(this.user);
    });
  }

  userLogout() {
    this.user = null;
    this.auth.logout('');
  }

  ngOnDestroy() {
    console.log("home destroyed gg rekt");
    this.authState.unsubscribe();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }

  // chosenLocation(event): void {
  //   console.log(event);
  // }

}

export interface Event{
  name: string,
  start: string,
  end: string,
  lat: number,
  lng: number,
  description: string,
  likes: number,
  publisher: any,
  comments: any[]
}
