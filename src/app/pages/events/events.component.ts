import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  allEvents : any;

  displaySignin: boolean = false;

  constructor(private fbd : FirebaseService) { 
    this.fbd.getEvents().valueChanges().subscribe(data => {
      this.allEvents = data;
    });

    console.log("events entered");
  }

  ngOnInit() {
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }

}
