import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'app-discover-list',
  templateUrl: './discover-list.component.html',
  styleUrls: ['./discover-list.component.scss']
})
export class DiscoverListComponent implements OnInit {

  @Input() events;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() user;

  event;

  filteredEvents = null;
  currentFilter: string = '';
  searchKeys: string = "";

  displayEventAdd = false;
  displayEventSearch = false;
  time: number;


  
  constructor(private fbd: FirebaseService) {
    this.time = Date.now();
  }

  ngOnInit() {
  }

  addEvent() {
    if (!this.user){
      alert("Sign-in to post events!");
      return;
    }
    this.displayEventAdd = true;
  }

  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;

    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'Less than an hour ago';
  }

  sortBy(filter) {
    if (this.currentFilter === filter) {
      this.currentFilter = '';
      this.filteredEvents = null;
    }
    else if (filter == 'likes') {
      this.currentFilter = filter;
      this.filteredEvents = this.events.slice(0);
      this.filteredEvents = this.filteredEvents.sort((a, b) => {
        if (a['eventLikers'].length > b['eventLikers'].length) return -1;
        if ((a['eventLikers'].length < b['eventLikers'].length)) return 1;
        return 0;
      });
    }
    else {
      this.currentFilter = filter;
      this.filteredEvents = this.events.slice(0);
      this.filteredEvents = this.filteredEvents.sort((a, b) => {
        if (a[filter] < b[filter]) return -1;
        if (a[filter] > b[filter]) return 1;
        return 0;
      });
    }
  }

  eventSearch() {
    if (this.displayEventSearch) {
      this.displayEventSearch = false;
      this.searchKeys = "";
    }
    else {
      this.displayEventSearch = true;
      this.sortBy(this.currentFilter);
    }
  }

  filterChange(event){
    this.filteredEvents = this.events.slice(0);
    this.filteredEvents = this.filteredEvents.filter((event) => {
      return event['name'].toLowerCase().includes(this.searchKeys.toLowerCase()) || event['description'].toLowerCase().includes(this.searchKeys.toLowerCase());
    });
  }

  onEventSelect(event) {
    this.selectedEvent.emit(event);
  }

  onClose(message:boolean):void {
    this.displayEventAdd = false;
  }
}
