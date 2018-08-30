import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.scss']
})
export class ModalSigninComponent implements OnInit {

  @Input() displaySignin: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }

}
