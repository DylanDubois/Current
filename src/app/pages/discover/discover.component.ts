import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  allEvents: any;

  displaySignin: boolean = false;

  authState;

  user;

  constructor(private fbd : FirebaseService, public auth : AuthService) {
   }

  ngOnInit() {
    this.authState = this.auth.getAuthState().subscribe((auth) =>{
      if (auth)
        this.user = auth;
    });
  }

  userLogout() {
    this.user = null;
    this.auth.logout('discover');
  }

  ngOnDestroy() {
    console.log("discover destroyed gg rekt");
    this.authState.unsubscribe();
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }
}
