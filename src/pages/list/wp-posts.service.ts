import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {WpPosts} from "./wp-posts.model";
import {createRequestOption} from "./request-util";
import 'rxjs/Rx';

export type EntityResponseType = HttpResponse<WpPosts>;

@Injectable()
export class WpPostsService {

    private resourceUrl = 'wp-posts';

    constructor(private http: HttpClient) { }

    create(wpPosts: WpPosts): Observable<EntityResponseType> {
        const copy = this.convert(wpPosts);
        return this.http.post<WpPosts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(wpPosts: WpPosts): Observable<EntityResponseType> {
        const copy = this.convert(wpPosts);
        return this.http.put<WpPosts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WpPosts>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WpPosts[]>> {
        const options = createRequestOption(req);
        return this.http.get<WpPosts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WpPosts[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WpPosts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WpPosts[]>): HttpResponse<WpPosts[]> {
        const jsonResponse: WpPosts[] = res.body;
        const body: WpPosts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WpPosts.
     */
    private convertItemFromServer(wpPosts: WpPosts): WpPosts {
        const copy: WpPosts = Object.assign({}, wpPosts);
        return copy;
    }

    /**
     * Convert a WpPosts to a JSON which can be sent to the server.
     */
    private convert(wpPosts: WpPosts): WpPosts {
        const copy: WpPosts = Object.assign({}, wpPosts);
        return copy;
    }
}
