import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-modal-event-creation',
  templateUrl: './modal-event-creation.component.html',
  styleUrls: ['./modal-event-creation.component.scss']
})
export class ModalEventCreationComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() user;

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

  eventTypes = ['Academic', 'Conditional', 'Entertainment', 'Social', 'Other'];

  userCanDelete: boolean = false;

  constructor(private fbd : FirebaseService, private auth : AuthService) { }

  ngOnInit() {
    document.getElementById("modal").scrollIntoView(false);
  }

  postEvent() {
    if (!this.newEvent.name || !this.newEvent.description || !this.newEvent.lat) return;
    this.newEvent.publisher = {name: this.user.displayName, photoURL: this.user.photoURL, uid: this.user.uid};
    this.newEvent.start = Date.now();
    this.fbd.addEvent(this.newEvent, this.user.uid);
    this.onClose();
  }

  mapClicked(event) {
    this.newEvent.lat = event.coords.lat;
    this.newEvent.lng = event.coords.lng;
  }

  onClose() {
    this.close.emit(false);
  }
}
