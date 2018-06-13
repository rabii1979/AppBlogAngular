import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";
import {Post} from "../models/post";
import {Book} from "../../../../bookshelves/src/app/models/book.model";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

    postsSubject = new Subject<Post[]>();

    posts: Post[] = []
     /*   [
        {
            title: 'Mon premier post',
            content: 'Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam, redamare possit, non admodum delectari? Nihil est enim remuneratione benevolentiae, nihil vicissitudine studiorum officiorumque iucundius.',
            loveIts: 1,
            created_at: new Date()
        },
        {
            title: 'Mon deuxième  post',
            content: 'Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam, redamare possit, non admodum delectari? Nihil est enim remuneratione benevolentiae, nihil vicissitudine studiorum officiorumque iucundius.',
            loveIts: -1,
            created_at: new Date()
        },
        {
            title: 'Encore un  post',
            content: 'Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam, redamare possit, non admodum delectari? Nihil est enim remuneratione benevolentiae, nihil vicissitudine studiorum officiorumque iucundius.',
            loveIts: 0,
            created_at: new Date()
        }
    ];
    */

    emitPostSubject() {
        this.postsSubject.next(this.posts.slice());
    }

    loveit(post: Post){
        const postIndex = this.posts.findIndex(
            (postEl) => {
                if(postEl === post) {
                    post.loveIts++;
                    return true;
                }
            }
        );
        this.emitPostSubject();
    }
    dontLoveit(post: Post){
        const postIndex = this.posts.findIndex(
            (postEl) => {
                if(postEl === post) {
                    post.loveIts--;
                    return true;
                }
            }
        );
        this.emitPostSubject();
    }

    savePosts() {
        firebase.database().ref('/posts').set(this.posts);
    }

    getPosts() {
        firebase.database().ref('/posts')
            .on('value', (data: DataSnapshot) => {
                    this.posts = data.val() ? data.val() : [];
                    this.emitPostSubject();
                }
            );
    }
    createNewPost(newPost: Post) {

        this.posts.push(newPost);
        this.savePosts();
        this.emitPostSubject();
    }

    removePost(post: Post) {
        const postIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if(postEl === post) {
                    return true;
                }
            }
        );
        this.posts.splice(postIndexToRemove, 1);
        this.savePosts();
        this.emitPostSubject();
    }

}
