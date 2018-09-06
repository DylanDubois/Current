import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-event-details',
  templateUrl: './modal-event-details.component.html',
  styleUrls: ['./modal-event-details.component.scss']
})
export class ModalEventDetailsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;

  time;
  constructor() {
    this.time = Date.now();
   }

  ngOnInit() {
  }

  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;

    return diff > 1 ? Math.round(diff) + "hour(s) ago" : 'less than an hour ago';
  }

  onClose() {
    this.close.emit(false);
  }
}

