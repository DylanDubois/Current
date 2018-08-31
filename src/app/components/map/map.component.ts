import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() markers;

  //@Output() chosenLocation: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  lat: number;
  lng: any;

  ngOnInit() {
    this.lat = 30.4515;
    this.lng = -91.1871;
  }

  mapClicked(event) {
    //this.chosenLocation.emit(event);
  }

}
