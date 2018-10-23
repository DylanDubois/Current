import { AuthService } from './../../providers/auth.service';
import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Tracks current page cookie to select a new header image every time the app loads
  headerCookie = 0;
  headerImages =
    ["url('https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      "url('https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      "url('https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      "url('https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
    ];

  //arrays for events and filtered events
  allEvents: any;
  filteredEvents = null;

  displaySignin: boolean = false;
  displayDropdown: boolean = false;
  displayEventAdd: boolean = false;
  displayEventSearch: boolean = false;
  displayEvent: boolean = false;

  // tracks user information and authorization status
  authState;
  user;

  // maintains current filter paramaters
  currentFilter: string = 'All';
  searchKeys: string = "";
  sortByLikes: boolean = false;
  eventTypes: string[] = ['All', 'Academic', 'Conditional', 'Entertainment', 'Social', 'Other'];

  // current event in view
  selectedEvent: any;

  // subscribes to Firebase service to retrieve events
  fbObservable: any;

  // tracks whether the application should format for mobile or desktop screens
  mobileDevice: boolean = false;

  constructor(private fbd: FirebaseService, public auth: AuthService, private cookieService: CookieService) {
    this.mobileDevice = screen.width <= 700;
  }

  // fetch current header, fetch all events, and check user authorization
  ngOnInit() {
    this.getHeaderCookie();
    document.getElementById("headerBackDrop").style.backgroundImage = this.headerImages[this.headerCookie % this.headerImages.length];
    this.fbObservable = this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
      this.allEvents.reverse();
    });
    this.authState = this.auth.getAuthState().subscribe((auth) => {
      if (auth)
        this.user = auth;
    });
  }

  // checks whether the user has saved a header cookie; sets background image based on returned or created value
  getHeaderCookie() {
    if (!this.cookieService.check('header')) {
      this.cookieService.set('header', '0');
      this.headerCookie = 0;
      return;
    }
    this.headerCookie = +this.cookieService.get('header');
    this.cookieService.set('header', String(this.headerCookie + 1));
  }

  // removes user authorization from application
  userLogout() {
    if (confirm("Are you sure you want to logout?")) {
      this.user = null;
      this.auth.logout('');
    }
  }

  // prevents data leaks when application is closed
  ngOnDestroy() {
    console.log("home destroyed gg rekt");
    this.authState.unsubscribe();
    this.fbObservable.unsubscribe();
  }

  // closes all windows when selected (i.e. modal close)
  onClose(message: boolean): void {
    this.displaySignin = false;
    this.displayDropdown = false;
    this.displayEvent = false;
    this.displayEventAdd = false;
  }

  // when user selects event from list, it is sent to the map, and vice versa; event window is displayed
  eventSelected(event) {
    this.selectedEvent = event;
    this.displayEvent = true;
  }

  // checks for user auth; displays New Event window when successful
  addEvent() {
    if (!this.user) {
      alert("Sign-in to post events!");
      return;
    }
    this.displayEventAdd = true;
  }

  // *************** All sorting and filtering methods *************** //

  sortByLikesFilter() {
    this.currentFilter = 'All';
    this.searchKeys = '';
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

  filterByType(type) {
    this.sortByLikes = false;
    this.searchKeys = '';
    if (type == 'All') {
      this.filteredEvents = null;
      return;
    }
    this.filteredEvents = this.allEvents.slice(0);
    this.filteredEvents = this.filteredEvents.filter((event) => {
      return event['type'] == type;
    });
  }

  // checks for the 'enter' key press in the search bar
  searchKeyPress(event) {
    if (event.keyCode === 13) this.eventSearch();
  }

  eventSearch() {
    this.sortByLikes = false;
    this.currentFilter = 'All';
    if (this.searchKeys == '') {
      this.filteredEvents = null;
      return;
    }
    this.filteredEvents = this.allEvents.slice(0);
    this.filteredEvents = this.filteredEvents.filter((event) => {
      return event['name'].toLowerCase().includes(this.searchKeys.toLowerCase()) || event['description'].toLowerCase().includes(this.searchKeys.toLowerCase());
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
