import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

    constructor(private afd : AngularFireDatabase) {

    }

    getLocations() {
        return this.afd.list('/locations');
    }

    getEvents() {
        return this.afd.list('/events');
    }

    addItem(item) {
        this.afd.list('/locations').push(item);
    }

    addEvent(event) {
        this.afd.list('/events').push(event);
    }
}
