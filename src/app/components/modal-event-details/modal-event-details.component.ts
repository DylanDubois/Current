import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-event-details',
  templateUrl: './modal-event-details.component.html',
  styleUrls: ['./modal-event-details.component.scss']
})
export class ModalEventDetailsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }
}

