import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  allEvents: any;

  displaySignin: boolean = false;
  displayDropdown: boolean = false;

  authState;

  selectedEvent: any;

  user;

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
      this.auth.logout('events');
    }
  }

  ngOnDestroy() {
    console.log("events destroyed gg rekt");
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

}
