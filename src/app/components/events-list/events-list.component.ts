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

  event;

  displayEvent = false;

  constructor(private fbd : FirebaseService) { 

  }

  ngOnInit() {
  }

  addEvent(){

  }

  onClose(event) {
    this.displayEvent = false;
  }

  onEventSelect(event) {
    this.event = event;
    this.selectedEvent.emit(event);
    this.displayEvent = true;
  }

}
