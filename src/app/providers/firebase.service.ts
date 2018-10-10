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

    getExploreEvents() {
        return this.afd.list('/explore');
    }

    addItem(item) {
        this.afd.list('/locations').push(item);
    }

    addEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user)=>{
            if (user && (!user['posts'] || user['posts'].length < 2)) {
                event['eventLikers'] = [];
                event['eventLikers'].push(uid);
                this.afd.object(`/events/${event.start}`).set(event);
                if (!user['posts']){
                    user['posts'] = [];
                    user['posts'].push(event.start);
                }
                else {
                    user['posts'].push(event.start);
                }
                this.afd.object(`/users/${uid}`).update({posts: user['posts']});
                userObs.unsubscribe();
            }
            else {
                alert("You have have posted too many events.");
                userObs.unsubscribe();
            }
            
        });
    }

        addExploreEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user)=>{
            if (user && (!user['posts'] || user['posts'].length < 2)) {
                event['eventLikers'] = [];
                event['eventLikers'].push(uid);
                this.afd.object(`/explore/${event.start}`).set(event);
                if (!user['posts']){
                    user['posts'] = [];
                    user['posts'].push(event.start);
                }
                else {
                    user['posts'].push(event.start);
                }
                this.afd.object(`/users/${uid}`).update({posts: user['posts']});
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
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user)=>{
            if (user['posts'].length != 0) {
                let tmpPosts = user['posts'].splice(0);
                tmpPosts = tmpPosts.filter((post) => {return post != event.start});
                this.afd.object(`/events/${event.start}`).remove();
                this.afd.object(`/users/${uid}`).update({posts: tmpPosts});
                userObs.unsubscribe();
            }
            else {
                userObs.unsubscribe();
            }
            
        });
    }

    deleteExploreEvent(event, uid) {
        let userObs = this.afd.object(`/users/${uid}`).valueChanges().subscribe((user)=>{
            if (user['posts'].length != 0) {
                let tmpPosts = user['posts'].splice(0);
                tmpPosts = tmpPosts.filter((post) => {return post != event.start});
                this.afd.object(`/explore/${event.start}`).remove();
                this.afd.object(`/users/${uid}`).update({posts: tmpPosts});
                userObs.unsubscribe();
            }
            else {
                userObs.unsubscribe();
            }
            
        });
    }

    likeEvent(event, uid){
        let eventObs = this.afd.object(`/events/${event.start}`).valueChanges().subscribe((eventOb)=>{
            if (eventOb && !eventOb['eventLikers'].includes(uid)) {
                eventOb['eventLikers'].push(uid);
                this.afd.object(`/events/${event.start}`).update({eventLikers: eventOb['eventLikers']});
                eventObs.unsubscribe();
            }
            else {
                eventObs.unsubscribe();
            }
            
        });
    }

    dislikeEvent(event, uid){
        let eventObs = this.afd.object(`/events/${event.start}`).valueChanges().subscribe((eventOb)=>{
            if (eventOb && eventOb['eventLikers'].includes(uid)) {
                eventOb['eventLikers'] = eventOb['eventLikers'].filter((likerId) => {
                    return likerId != uid;
                });
                this.afd.object(`/events/${event.start}`).update({eventLikers: eventOb['eventLikers']});
                eventObs.unsubscribe();
            }
            else {
                eventObs.unsubscribe();
            }
            
        });

    }

    postExploreComment(comment, eventId) {
        this.afd.list(`/exploreComments/${eventId}`).push(comment);
    }

    getExploreComments(eventId) {
        return this.afd.list(`/exploreComments/${eventId}`);
    }
}
