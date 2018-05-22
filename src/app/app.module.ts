import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {WpPostsService} from "../pages/list/wp-posts.service";
import {ListDetailPage} from "../pages/listDetail/list-detail";
import {EllipsisModule} from "@thisissoon/angular-ellipsis";
import {PostsPage} from "../pages/posts/posts";
import {MomentModule} from "angular2-moment";
import {RedditApiService} from "../pages/posts/reddit-api-service";
import {GlobalService} from "../pages/home/global.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListDetailPage,
    PostsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    EllipsisModule,
    MomentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListDetailPage,
    PostsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WpPostsService,
    RedditApiService,
    GlobalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
