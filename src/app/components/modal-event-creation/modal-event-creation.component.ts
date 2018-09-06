import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
  start: '',
  end: '',
  lat: '',
  lng: '',
  description: '',
  likes: '',
  publisher: '',
  comments: [],
  type: ''
  }

  constructor(private fbd : FirebaseService) { }

  ngOnInit() {
    console.log(this.user, this.newEvent);
  }

  postEvent() {
    console.log("posted");
  }

  mapClicked(event) {
    this.newEvent.lat = event.coords.lat;
    this.newEvent.lng = event.coords.lng;
  }

  onClose() {
    this.close.emit(false);
    console.log(this.newEvent);
  }
}
