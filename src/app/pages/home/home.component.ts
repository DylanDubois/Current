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

  constructor(private fbd : FirebaseService) {
     this.fbd.getEvents().valueChanges().subscribe(data => {
       this.allEvents = data;
     });

     console.log("home entered");
   }

  ngOnInit() {
    
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }

  // chosenLocation(event): void {
  //   console.log(event);
  // }

}
