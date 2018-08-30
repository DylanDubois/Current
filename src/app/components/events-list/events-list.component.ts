import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input() events;

  @Input() header: string;

  constructor(private fbd : FirebaseService) { 

  }

  ngOnInit() {
  }

  addEvent(){

  }

}
