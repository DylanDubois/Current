import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'app-modal-explore-details',
  templateUrl: './modal-explore-details.component.html',
  styleUrls: ['./modal-explore-details.component.scss']
})
export class ModalExploreDetailsComponent implements OnInit {

  // emits 'close' window function; takes current user info and selected event as inputs
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;
  @Input() user;

  // determines whether the user can like an event they don't own or delete their own event
  userCanDelete: boolean = false;
  userCanLike: boolean;

  // tracks the time of opening the modal
  time;

  // subscribes to the Firebase Comments node for the selected event and stores them in an array
  commentsObservable;
  comments = [];

  // temporary object for a new user comment
  newComment = {
    text: '',
    publisher: {},
    postTime: 1
  }

  constructor(private fbd : FirebaseService) {
    this.time = Date.now();
   }

   // scrolls to window when opened; subscribes to Firebase to fetch comments; determines whether 
   // user can like or delete the event
  ngOnInit() {
    document.getElementById("modal").scrollIntoView(false);
    this.commentsObservable = this.fbd.getComments(this.event.start).valueChanges().subscribe((comments) => {
        this.comments = comments;
        this.comments.reverse();
    });
    this.userCanDelete = this.user ? this.user.uid == this.event.publisher.uid : false;
    this.userCanLike = this.user && this.event['eventLikers'].includes(this.user.uid) ? false : true;
  }

  // converts event time posted from milliseconds to a readable string
  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;
    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'less than an hour ago';
  }

  // emits 'close' function when selected
  onClose() {
    this.close.emit(false);
  }

  // unsubscribes from Firebase to prevent memory leak
  ngOnDestroy(){
    this.commentsObservable.unsubscribe();
  }

  // if the user owns this event, this function will remove it and its comments from Firebase
  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")){
      this.fbd.deleteEvent(this.event, this.user.uid);
      this.onClose();
    }
  }

  // adds user to event's list of 'event-likers'
  likeEvent() {
    if (this.userCanLike){
      this.fbd.likeEvent(this.event, this.user.uid );
      this.userCanLike = false;
    }
    else if (this.user && this.event.publisher.uid != this.user.uid) {
      this.fbd.dislikeEvent(this.event, this.user.uid);
      this.userCanLike = true;
    }
  }

  // adds new comment to Comments node for selected event
  postComment() {
    if (!this.newComment.text) return;
    if (!this.user){
      alert("Sign-in to comment");
      return;
    }
    this.time = Date.now();
    this.newComment.postTime = this.time;
    this.newComment.publisher = {name: this.user.displayName, photoURL: this.user.photoURL, uid: this.user.uid};
    this.fbd.postComment(this.newComment, this.event.start);
    this.newComment = {    
      text: '',
      publisher: {},
      postTime: 1};
  }

  // when selected, the window scrolls the comment box into view
  scrollToComments(element){
    element.scrollIntoView(false);
  }
}
