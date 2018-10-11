import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  allEvents: any;

  displaySignin: boolean = false;
  displayDropdown: boolean = false;

  authState;

  user;
  fbObservable: any;
  selectedEvent: any;
  displayEvent: boolean;

  constructor(private fbd : FirebaseService, public auth : AuthService) {
   }

  ngOnInit() {
    this.authState = this.auth.getAuthState().subscribe((auth) =>{
      if (auth)
        this.user = auth;
    });
    this.fbObservable = this.fbd.getExploreEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
      this.allEvents.reverse();
    });
  }

  userLogout() {
    if (confirm("Are you sure you want to logout?")){
      this.user = null;
      this.auth.logout('explore');
    }
  }

  ngOnDestroy() {
    console.log("discover destroyed gg rekt");
    this.authState.unsubscribe();
    this.fbObservable.unsubscribe();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
    this.displayDropdown = false;
    this.displayEvent = false;
  }

  eventSelected(event) {
    this.selectedEvent = event;
    this.displayEvent = true;
  }
}
