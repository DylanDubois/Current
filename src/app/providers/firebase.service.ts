import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    constructor(private afd: AngularFireDatabase) {

    }

    // returns list of all events
    getEvents() {
        return this.afd.list('/events');
    }

    // returns list of all comments for a particular event
    getComments(eventId) {
        return this.afd.list(`/comments/${eventId}`);
    }

    // creates new Event node for database
    addEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user) => {
            if (user && (!user['posts'] || user['posts'].length < 2 || user['uid'] === 'w57H0QjcoWUpr4XlbmiynjV2pO73' || user['uid'] === '8FMZoN5pLZTknZtiFIMi6UjqOGb2')) {
                event['eventLikers'] = [];
                event['eventLikers'].push(uid);
                this.afd.object(`/events/${event.start}`).set(event);
                if (!user['posts']) {
                    user['posts'] = [];
                    user['posts'].push(event.start);
                }
                else {
                    user['posts'].push(event.start);
                }
                this.afd.object(`/users/${uid}`).update({ posts: user['posts'] });
                userObs.unsubscribe();
            }
            else {
                alert("You have have posted too many events.");
                userObs.unsubscribe();
            }

        });
    }

    // when user signs in, create or update their current information
    addUser(user) {
        this.afd.object(`/users/${user.user.uid}`).update({ uid: user.user.uid });
    }

    // removes Event node from database
    deleteEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user) => {
            if (user['posts'].length != 0) {
                let tmpPosts = user['posts'].splice(0);
                tmpPosts = tmpPosts.filter((post) => { return post != event.start });
                this.afd.object(`/events/${event.start}`).remove();
                this.afd.object(`/users/${uid}`).update({ posts: tmpPosts });
                userObs.unsubscribe();
            }
            else {
                userObs.unsubscribe();
            }

        });
    }

    // adds user to list of event likers
    likeEvent(event, uid) {
        let eventObs = this.afd.object(`/events/${event.start}`).valueChanges().subscribe((eventOb) => {
            if (eventOb && !eventOb['eventLikers'].includes(uid)) {
                eventOb['eventLikers'].push(uid);
                this.afd.object(`/events/${event.start}`).update({ eventLikers: eventOb['eventLikers'] });
                eventObs.unsubscribe();
            }
            else {
                eventObs.unsubscribe();
            }

        });
    }

    // removes user from list of event likers
    dislikeEvent(event, uid) {
        let eventObs = this.afd.object(`/events/${event.start}`).valueChanges().subscribe((eventOb) => {
            if (eventOb && eventOb['eventLikers'].includes(uid)) {
                eventOb['eventLikers'] = eventOb['eventLikers'].filter((likerId) => {
                    return likerId != uid;
                });
                this.afd.object(`/events/${event.start}`).update({ eventLikers: eventOb['eventLikers'] });
                eventObs.unsubscribe();
            }
            else {
                eventObs.unsubscribe();
            }

        });

    }

    // creates new Comment node for the selected event
    postComment(comment, eventId) {
        this.afd.list(`/comments/${eventId}`).push(comment);
    }

}
