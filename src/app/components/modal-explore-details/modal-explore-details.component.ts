import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'app-modal-explore-details',
  templateUrl: './modal-explore-details.component.html',
  styleUrls: ['./modal-explore-details.component.scss']
})
export class ModalExploreDetailsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;
  @Input() user;

  userCanDelete: boolean = false;
  userCanLike: boolean;
  time;
  constructor(private fbd : FirebaseService) {
    this.time = Date.now();
   }

  ngOnInit() {
    this.userCanDelete = this.user ? this.user.uid == this.event.publisher.uid : false;
    this.userCanLike = this.user && this.event['eventLikers'].includes(this.user.uid) ? false : true;
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
      this.fbd.deleteExploreEvent(this.event, this.user.uid);
      this.onClose();
    }
  }

  likeEvent() {
    if (this.userCanLike){
      this.fbd.likeEvent(this.event, this.user.uid );
      this.userCanLike = false;
    }
    else if (this.user && this.event.publisher.uid != this.user.uid) {
      this.fbd.dislikeEvent(this.event, this.user.uid);
      this.userCanLike = true;
    }
  }
}
