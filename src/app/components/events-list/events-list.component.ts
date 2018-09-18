import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() events;

  @Input() header: string;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() user;

  event;

  filteredEvents = null;
  currentFilter: string = '';

  displayEventAdd = false;
  time: number;

  constructor(private fbd: FirebaseService) {
    this.time = Date.now();
  }

  ngOnInit() {
  }

  addEvent() {
    if (!this.user){
      alert("Sign-in to post events!");
      return;
    }
    this.displayEventAdd = true;
  }

  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;

    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'Less than an hour ago';
  }

  sortBy(filter) {
    if (this.currentFilter === filter) {
      this.currentFilter = '';
      this.filteredEvents = null;
    }
    else {
      this.currentFilter = filter;
      this.filteredEvents = this.events.slice(0);
      this.filteredEvents = this.filteredEvents.sort((a, b) => {
        if (a[filter] > b[filter]) return -1;
        if (a[filter] < b[filter]) return 1;
        return 0;
      });
    }


  }

  onEventSelect(event) {
    this.selectedEvent.emit(event);
  }

  onClose(message:boolean):void {
    this.displayEventAdd = false;
  }

}
