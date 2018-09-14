import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() markers;
  @Input() event;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedLocation: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  lat: number;
  lng: number;
  zoom: number = 8;

  ngOnInit() {
    this.lat = 30.4515;
    this.lng = -91.1871;
  }

  mapClicked(event) {
    this.selectedLocation.emit(event);
  }

  markerClicked(marker){
    this.selectedEvent.emit(marker);
  }

  ngOnChanges(changes) {
    if (changes.event && changes.event.currentValue){
      this.lat = changes.event.currentValue.lat;
      this.lng = changes.event.currentValue.lng;
      this.zoom = 11;
    }
    
  }

}
