import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-modal-event-creation',
  templateUrl: './modal-event-creation.component.html',
  styleUrls: ['./modal-event-creation.component.scss']
})
export class ModalEventCreationComponent implements OnInit {

  // emits 'close' function; takes user info as input
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user;

  // temporary event object modeled to input fields
  newEvent = {
  name: '',
  start: 0,
  end: '',
  lat: '',
  lng: '',
  description: '',
  likes: 1,
  publisher: {},
  comments: [],
  type: 'Academic',
  eventLikers: [],
  goal: 1
  }

  // event types for select element option
  eventTypes = ['Academic', 'Conditional', 'Entertainment', 'Social', 'Other'];

  constructor(private fbd : FirebaseService, private auth : AuthService) { }

  ngOnInit() {
    document.getElementById("modal").scrollIntoView(false);
  }

  // when all fields are filled, Firebase service creates new Event object
  postEvent() {
    if (!this.newEvent.name || !this.newEvent.description || !this.newEvent.lat) return;
    this.newEvent.publisher = {name: this.user.displayName, photoURL: this.user.photoURL, uid: this.user.uid};
    this.newEvent.start = Date.now();
    this.fbd.addEvent(this.newEvent, this.user.uid);
    this.onClose();
  }

  // user selects event location from the map and it is stored
  mapClicked(event) {
    this.newEvent.lat = event.coords.lat;
    this.newEvent.lng = event.coords.lng;
  }

  // emits 'close' function when selected
  onClose() {
    this.close.emit(false);
  }
}
