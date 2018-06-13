import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../models/post";
import {PostsService} from "../services/posts.service";
import {Subscription} from "rxjs/index";
import {Book} from "../../../../bookshelves/src/app/models/book.model";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit, OnDestroy {


  posts: Post[];
  postSubscription: Subscription;

  constructor(private postsService:PostsService) { }

  ngOnInit() {

      this.postSubscription = this.postsService.postsSubject.subscribe(
          (posts: any[]) => {
              this.posts = posts;
          }
      );
      this.postsService.getPosts();
      this.postsService.emitPostSubject();
  }

    onLoveIt(post: Post){

        this.postsService.loveit(post);
    }
    onDontLoveIt(post: Post){
        this.postsService.dontLoveit(post);
    }

    onDeletePost(post: Post) {
        this.postsService.removePost(post);
    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
    }

}
