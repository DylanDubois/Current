import { AuthService } from './../../providers/auth.service';
import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  allEvents: any;

  displaySignin: boolean = false;

  authenticated: boolean = false;

  user;

  constructor(private fbd : FirebaseService, private auth : AuthService) {
   }

  ngOnInit() {
    this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
    });
    this.user = this.auth.currentUser();
    this.authenticated = this.auth.authenticated();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }

  // chosenLocation(event): void {
  //   console.log(event);
  // }

}
