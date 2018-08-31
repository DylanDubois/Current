import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  displaySignin: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClose(message:boolean):void {
    this.displaySignin = false;
  }
}
