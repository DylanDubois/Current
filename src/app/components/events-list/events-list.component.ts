import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  // takes an array of event objects; emits user-selected event object 
  @Input() events;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  // tracks time of page load
  time: number;


  constructor(private fbd: FirebaseService) {
    this.time = Date.now();
  }

  ngOnInit() {
  }

  // converts event post time from milliseconds to readable string
  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;
    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'Less than an hour ago';
  }

  // emits event selected from list
  onEventSelect(event) {
    this.selectedEvent.emit(event);
  }

}
