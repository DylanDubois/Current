import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() markers;

  constructor() { }

  lat: number;
  lng: any;

  ngOnInit() {
    this.lat = 30.4515;
    this.lng = -91.1871;
  }

}
