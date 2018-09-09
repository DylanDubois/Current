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

  displayEvent = false;
  displayEventAdd = false;

  constructor(private fbd : FirebaseService) { 

  }

  ngOnInit() {
  }

  addEvent(){
    if (!this.user) return;
    this.displayEventAdd = true;
  }

  onClose(event) {
    this.displayEvent = false;
    this.displayEventAdd = false;
  }

  onEventSelect(event) {
    this.event = event;
    this.selectedEvent.emit(event);
    this.displayEvent = true;
  }

}
