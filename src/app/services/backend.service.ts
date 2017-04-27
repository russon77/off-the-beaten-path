import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { LatLngPosition } from '../models/position.model';
import { EasyPagination } from '../models/easy-pagination.model';
import { Directions } from '../models/directions.model';
import { ViewPost, SubmissionPost } from '../models/post.model';
import { TargetLocation } from '../models/target.model';
import { environment } from '../../environments/environment';

const EXAMPLE_LOCATION: TargetLocation = new TargetLocation(new LatLngPosition(1, 2), 'secret_key', 10, 2);

const EXAMPLE_POSTS: ViewPost[] = [
    new ViewPost('Wow! Great view!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! I love it!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Met a new friend!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Another successful hike!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Bit by a turtle!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Great view!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Great view!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Great view!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287),
    new ViewPost('Wow! Great view!', 'https://material.angular.io/assets/img/examples/shiba2.jpg', 42, 1492547287)
];

const EXAMPLE_POSTS_PAGINATION: EasyPagination<ViewPost> = new EasyPagination<ViewPost>(EXAMPLE_POSTS, 1, false);

@Injectable()
export class BackendService {

    constructor(private http: Http) { }

    getTargetLocation(currentLocation: LatLngPosition): Observable<TargetLocation> {
	return this.http
	    .get(
		`${environment.api_url}/target/${currentLocation.lat},${currentLocation.lng}`
	    )
	    .map(
		response => response.json()
	    );
    }

    getTargetLocationByKey(key: string): Observable<TargetLocation> {
	return this.http
	    .get(
		`${environment.api_url}/target/key/${key}`
	    )
	    .map(
		response => response.json()
	    );
    }

    getPosts(key: string, page: number = 1): Observable<EasyPagination<ViewPost>> {
	return this.http
	    .get(
		`${environment.api_url}/posts/${key}/${page}`
	    )
	    .map(
		response => {
		    const data: EasyPagination<ViewPost> = response.json();

		    // dates in Python are stored as floats in seconds,
		    // so here we convert to milliseconds for JS support
		    data.data.forEach(
			(item) => {
			    item.timestamp *= 1000.0;
			}
		    );
		    return data;
		}
	    );
    }

    addPost(post: SubmissionPost): Observable<boolean> {
	const headers = new Headers({ 'Content-Type': 'application/json' });
	const options = new RequestOptions({ headers: headers });

	return this.http
	    .post(
		`${environment.api_url}/posts/${post.key}`,
		JSON.stringify(post),
		options
	    )
	    .map(
		response => response.json()
	    );
    }
}
