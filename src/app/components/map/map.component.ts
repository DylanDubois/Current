import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() markers;
  @Input() selectedEvent;

  //@Output() chosenLocation: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  lat: number;
  lng: number;
  zoom: number = 8;

  ngOnInit() {
    this.lat = 30.4515;
    this.lng = -91.1871;
  }

  mapClicked(event) {
    //this.chosenLocation.emit(event);
  }

  ngOnChanges(changes) {
    if (changes.selectedEvent && changes.selectedEvent.currentValue){
      this.lat = changes.selectedEvent.currentValue.lat;
      this.lng = changes.selectedEvent.currentValue.lng;
      this.zoom = 11;
    }
    
  }

}
