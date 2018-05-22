import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

const BASE_URL: string =  'https://www.reddit.com/';
const JSON_POSTFIX: string = '.json';

@Injectable()
export class RedditApiService {

  constructor(public http: HttpClient) {}

  fetch(url?: string) {
    return url ?
      this.http.get(BASE_URL + '/r/' + url + JSON_POSTFIX)
        .map(this.redditCollectionToJson) :
      this.http.get(BASE_URL + JSON_POSTFIX)
        .map(this.redditCollectionToJson)
  }

  fetchNext(lastPostName: string, url?: string) {
    return url ?
      this.http.get(BASE_URL + '/r/' + url + JSON_POSTFIX + '?count=' + 25 + '&after=' + lastPostName)
        .map(this.redditCollectionToJson) :
      this.http.get(BASE_URL + JSON_POSTFIX + '?count=' + 25 + '&after=' + lastPostName)
        .map(this.redditCollectionToJson)
  }

  beautifyReplies(comments) {
    return comments.map(comment => {
      comment.replies = comment.replies ? comment.replies.data.children.map(reply => reply.data).filter(c => c.body) : [];
      this.beautifyReplies(comment.replies);
      return comment;
    })
  }

  redditCollectionToJson(response) {
    return response.data.children.map(c => c.data)
  }
}
