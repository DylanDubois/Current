import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  constructor(private fbd : FirebaseService) { 

  }

  ngOnInit() {
  }

  addEvent(){
    this.fbd.addEvent({location: 'here', time: 'now'});
  }

}
