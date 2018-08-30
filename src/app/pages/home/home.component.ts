import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allEvents: any;

  constructor(private fbd : FirebaseService) {
     this.fbd.getEvents().valueChanges().subscribe(data => {
       this.allEvents = data;
     });

     console.log("home entered");
   }

  ngOnInit() {
    
  }

}
