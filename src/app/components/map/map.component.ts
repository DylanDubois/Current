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

    console.log(this.mapStyles);
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

  mapStyles = [
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#71d6ff"
            },
            {
                "saturation": 100
            },
            {
                "lightness": -5
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#deecec"
            },
            {
                "saturation": -73
            },
            {
                "lightness": 72
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bababa"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 25
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e3e3e3"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 0
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#59cfff"
            },
            {
                "saturation": 100
            },
            {
                "lightness": 34
            },
            {
                "visibility": "on"
            }
        ]
    }
]
;

}
