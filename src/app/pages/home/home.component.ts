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
  displayDropdown: boolean = false;

  authState;

  user;

  selectedEvent: any;
  fbObservable: any;

  constructor(private fbd : FirebaseService, public auth : AuthService) {
   }

  ngOnInit() {
    this.fbObservable = this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
    });
    this.authState = this.auth.getAuthState().subscribe((auth) =>{
      if (auth)
        this.user = auth;
    });

  }

  userLogout() {
    if (confirm("Are you sure you want to logout?")){
      this.user = null;
      this.auth.logout('');
    }
  }

  ngOnDestroy() {
    console.log("home destroyed gg rekt");
    this.authState.unsubscribe();
    this.fbObservable.unsubscribe();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
    this.displayDropdown = false;
  }

  eventSelected(event) {
    this.selectedEvent = event;
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
  publisher: {},
  comments: any[],
  type: string
}
