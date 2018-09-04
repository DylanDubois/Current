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

  constructor() { }

  ngOnInit() {
    console.log(this.user, this.newEvent);
  }

  postEvent() {

  }

  onClose() {
    this.close.emit(false);
  }
}
