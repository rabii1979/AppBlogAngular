import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../models/post.model';
import {PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs/index';

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit, OnDestroy {


    posts: PostModel[];
    postSubscription: Subscription;

    constructor(private postsService: PostsService) {
    }

    ngOnInit() {

        this.postSubscription = this.postsService.postsSubject.subscribe(
            (posts: any[]) => {
                this.posts = posts;
            }
        );
        this.postsService.emitPostSubject();
    }

    onLoveIt(post: PostModel) {

        this.postsService.loveit(post);
    }

    onDontLoveIt(post: PostModel) {
        this.postsService.dontLoveit(post);
    }

    onDeletePost(post: PostModel) {
        this.postsService.removePost(post);
    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
    }

}
