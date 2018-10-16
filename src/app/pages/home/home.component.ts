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

  filteredEvents = null;
  currentFilter: string = 'All';
  searchKeys: string = "";
  sortByLikes: boolean = false;

  displayEventAdd = false;
  displayEventSearch = true;

  selectedEvent: any;
  fbObservable: any;
  displayEvent: boolean;

  eventTypes = ['All', 'Academic', 'Entertainment', 'Social', 'Other'];

  constructor(private fbd: FirebaseService, public auth: AuthService) {
  }

  ngOnInit() {
    this.fbObservable = this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
      this.allEvents.reverse();
    });
    this.authState = this.auth.getAuthState().subscribe((auth) => {
      if (auth)
        this.user = auth;
    });
  }

  userLogout() {
    if (confirm("Are you sure you want to logout?")) {
      this.user = null;
      this.auth.logout('');
    }
  }

  ngOnDestroy() {
    console.log("home destroyed gg rekt");
    this.authState.unsubscribe();
    this.fbObservable.unsubscribe();
  }

  onClose(message: boolean): void {
    this.displaySignin = false;
    this.displayDropdown = false;
    this.displayEvent = false;
    this.displayEventAdd = false;
  }

  eventSelected(event) {
    this.selectedEvent = event;
    this.displayEvent = true;
  }

  addEvent() {
    if (!this.user) {
      alert("Sign-in to post events!");
      return;
    }
    this.displayEventAdd = true;
  }

  sortByLikesFilter() {
    if (this.sortByLikes) {
      this.sortByLikes = false;
      this.filteredEvents = null;
      return;
    }
    this.sortByLikes = true;
    this.filteredEvents = this.allEvents.slice(0);
    this.filteredEvents = this.filteredEvents.sort((a, b) => {
      if (a['eventLikers'].length > b['eventLikers'].length) return -1;
      if ((a['eventLikers'].length < b['eventLikers'].length)) return 1;
      return 0;
    });
  }

}

export interface Event {
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
