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
        this.afd.object(`/events/${event.start}`).set(event);
    }

    addUser(user) {
        this.afd.object(`/users/${user.user.uid}`).set({uid: user.user.uid});
    }

    deleteEvent(event) {
        this.afd.object(`/events/${event.start}`).remove();
    }
}
