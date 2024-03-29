import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'app-modal-explore-details',
  templateUrl: './modal-explore-details.component.html',
  styleUrls: ['./modal-explore-details.component.scss']
})
export class ModalExploreDetailsComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() event: any;
  @Input() user;

  userCanDelete: boolean = false;
  userCanLike: boolean;
  time;

  commentsObservable;
  comments = [];

  newComment = {
    text: '',
    publisher: {},
    postTime: 1
  }

  constructor(private fbd : FirebaseService) {
    this.time = Date.now();
   }

  ngOnInit() {
    document.getElementById("modal").scrollIntoView(false);

    this.commentsObservable = this.fbd.getComments(this.event.start).valueChanges().subscribe((comments) => {
        this.comments = comments;
        this.comments.reverse();
    });
    this.userCanDelete = this.user ? this.user.uid == this.event.publisher.uid : false;
    this.userCanLike = this.user && this.event['eventLikers'].includes(this.user.uid) ? false : true;
  }

  convertStartToString(start) {
    let diff = (this.time- start) / 3600000;

    return diff > 1 ? Math.round(diff) + " hour(s) ago" : 'less than an hour ago';
  }

  onClose() {
    this.close.emit(false);
  }

  ngOnDestroy(){
    this.commentsObservable.unsubscribe();
  }

  deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")){
      console.log(this.user);
      this.fbd.deleteEvent(this.event, this.user.uid);
      this.onClose();
    }
  }

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

  scrollToComments(element){
    element.scrollIntoView(false);
  }
}
