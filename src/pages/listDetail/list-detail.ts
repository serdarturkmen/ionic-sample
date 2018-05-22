import {Component, OnInit} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {WpPosts} from "../list/wp-posts.model";

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage implements OnInit {
  wpPosts: WpPosts;

  constructor(private navParams: NavParams) {
    this.wpPosts = navParams.get('item');
  }


  ngOnInit(): void {
    console.log(this.wpPosts);
  }

}
