import { FirebaseService } from './../../providers/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fbd : FirebaseService) {
    // this.fbd.getLocations().valueChanges().subscribe(data => {
    //   console.log(data);   
    // });

   }

  ngOnInit() {
  }

}
