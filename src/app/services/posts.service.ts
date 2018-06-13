import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';
import {PostModel} from '../models/post.model';


@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor() {
    }

    postsSubject = new Subject<PostModel[]>();

    posts: PostModel[] =
        [
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

    emitPostSubject() {
        this.postsSubject.next(this.posts.slice());
    }

    loveit(post: PostModel) {
        const postIndex = this.posts.findIndex(
            (postEl) => {
                if (postEl === post) {
                    post.loveIts++;
                    return true;
                }
            }
        );
        this.emitPostSubject();
    }

    dontLoveit(post: PostModel) {
        const postIndex = this.posts.findIndex(
            (postEl) => {
                if (postEl === post) {
                    post.loveIts--;
                    return true;
                }
            }
        );
        this.emitPostSubject();
    }


    createNewPost(newPost: PostModel) {

        this.posts.push(newPost);
        this.emitPostSubject();
    }

    removePost(post: PostModel) {
        const postIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if (postEl === post) {
                    return true;
                }
            }
        );
        this.posts.splice(postIndexToRemove, 1);
        this.emitPostSubject();
    }

}
