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

    addEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user)=>{
            if (user && !user['posts']) {
                this.afd.object(`/events/${event.start}`).set(event);
                this.afd.object(`/users/${uid}`).update({posts: [event.start]});
                userObs.unsubscribe();
            }
            else {
                alert("You have have posted too many events.");
                userObs.unsubscribe();
            }

            
        });
    }

    addUser(user) {
        this.afd.object(`/users/${user.user.uid}`).update({uid: user.user.uid});
    }

    deleteEvent(event, uid) {
        this.afd.object(`/events/${event.start}`).remove();
        this.afd.object(`/users/${uid}`).update({posts: null});
    }
}
