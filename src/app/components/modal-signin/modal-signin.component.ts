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

  // modal displays when selected from Nav Bar
  @Input() displaySignin: boolean;

  // receives current page to redirect upon successful login (Deprecated)
  @Input() path: string;

  // when close is selected, transmits close function to parent components
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public auth : AuthService, private router : Router, private afd : FirebaseService) { }

  ngOnInit() {
    // scrolls to sign-in modal when clicked
    document.getElementById("modal").scrollIntoView(false);
  }

  onClose() {
    // when 'close' is selected, tells parent to close modal
    this.close.emit(false);
  }

  // uses Google OAuth to login
  signInWithGoogle(){
    this.auth.signInWithGoogle().then((data) => {
      this.afd.addUser(data);
      this.onClose();
    });
  }

}
