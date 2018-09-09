import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.scss']
})
export class ModalSigninComponent implements OnInit {

  @Input() displaySignin: boolean;
  @Input() path: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public auth : AuthService, private router : Router, private afd : FirebaseService) { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit(false);
  }

  signInWithGoogle(){
    this.auth.signInWithGoogle().then((data) => {
      this.afd.addUser(data);
      this.onClose();
    });
  }

}
