import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-modal-discover-creation',
  templateUrl: './modal-discover-creation.component.html',
  styleUrls: ['./modal-discover-creation.component.scss']
})
export class ModalDiscoverCreationComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() user;

  newEvent = {
  name: '',
  description: '',
  start: 1,
  likes: 1,
  publisher: {},
  comments: [],
  goal: 1
  }

  eventTypes = ['Academic', 'Entertainment', 'Social', 'Other'];

  userCanDelete: boolean = false;

  constructor(private fbd : FirebaseService, private auth : AuthService) { }

  ngOnInit() {
  }

  postEvent() {
    if (!this.newEvent.name || !this.newEvent.description) return;
    this.newEvent.publisher = {name: this.user.displayName, photoURL: this.user.photoURL, uid: this.user.uid};
    this.newEvent.start = Date.now();
    this.fbd.addExploreEvent(this.newEvent, this.user.uid);
    this.onClose();
  }


  onClose() {
    this.close.emit(false);
  }

}
