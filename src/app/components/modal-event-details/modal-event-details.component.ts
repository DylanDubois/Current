import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-event-details',
  templateUrl: './modal-event-details.component.html',
  styleUrls: ['./modal-event-details.component.scss']
})
export class ModalEventDetailsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;
  @Input() user;

  userCanDelete: boolean = false;
  time;
  constructor(private fbd : FirebaseService) {
    this.time = Date.now();
   }

  ngOnInit() {
    this.userCanDelete = this.user ? this.user.uid == this.event.publisher.uid : false;
  }

  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;

    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'less than an hour ago';
  }

  onClose() {
    this.close.emit(false);
  }

  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")){
      this.fbd.deleteEvent(this.event, this.user.uid);
      this.onClose();
    }
  }
}
