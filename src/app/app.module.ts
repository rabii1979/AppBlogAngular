import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {PostListItemComponent} from './post-list-item/post-list-item.component';
import {NewPostComponent} from './new-post/new-post.component';
import {PostsService} from "./services/posts.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { SinglePostComponent } from './single-post/single-post.component';

const appRoutes: Routes = [
    { path: 'posts', component: PostListItemComponent },
    { path: 'new', component: NewPostComponent },
    { path: 'view/:id', component: SinglePostComponent },
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: '**', redirectTo: 'posts' }
];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PostListItemComponent,
        NewPostComponent,
        SinglePostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [PostsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
