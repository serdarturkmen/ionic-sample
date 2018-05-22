import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {WpPosts} from "./wp-posts.model";
import {WpPostsService} from "./wp-posts.service";
import {ListDetailPage} from "../listDetail/list-detail";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  wpPosts: WpPosts[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private wpPostsService: WpPostsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('wpPost');
    console.log(this.selectedItem);

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'WpPost ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  loadAll() {
    this.wpPostsService.query().subscribe(
      (res: HttpResponse<WpPosts[]>) => {
        this.wpPosts = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  itemTapped(event, wpPost) {
    // That's right, we're pushing to ourselves!
    console.log(wpPost);
    this.navCtrl.push(ListDetailPage, {
      item: wpPost
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  private onError(error) {
    console.log(error.message)
  }

  trackId(index: number, item: WpPosts) {
    return item.id;
  }

}
