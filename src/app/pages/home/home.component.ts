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
    //  this.fbd.getEvents().valueChanges().subscribe(data => {
    //    this.allEvents = data;
    //  });

   }

  ngOnInit() {
    this.allEvents = [
      {
        "name": "Event Name",
        "lat": 29.4406,
        "lng": -90.7172
      },
      {
        "name": "Event Name",
        "lat": 30.3419,
        "lng": -90.185
      },
      {
        "name": "Event Name",
        "lat": 30.2875,
        "lng": -90.8807
      },
      {
        "name": "Event Name",
        "lat": 30.1526,
        "lng": -90.2868
      },
      {
        "name": "Event Name",
        "lat": 29.2051,
        "lng": -90.1203
      },
      {
        "name": "Event Name",
        "lat": 29.4013,
        "lng": -90.5264
      },
      {
        "name": "Event Name",
        "lat": 30.2983,
        "lng": -90.0676
      },
      {
        "name": "Event Name",
        "lat": 29.6525,
        "lng": -90.3508
      },
      {
        "name": "Event Name",
        "lat": 29.7608,
        "lng": -90.8351
      },
      {
        "name": "Event Name",
        "lat": 30.0012,
        "lng": -90.629
      },
      {
        "name": "Event Name",
        "lat": 29.143,
        "lng": -90.2156
      }
    ];
  }

}
