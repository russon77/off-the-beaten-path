import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LatLngPosition } from '../models/position.model';
import { EasyPagination } from '../models/easy-pagination.model';
import { Directions } from '../models/directions.model';
import { ViewPost, SubmissionPost } from '../models/post.model';
import { TargetLocation } from '../models/target.model';

const EXAMPLE_LOCATION: TargetLocation = new TargetLocation(new LatLngPosition(1, 2), 'secret_key');

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

    constructor() { }

    getTargetLocation(currentLocation: LatLngPosition): Observable<TargetLocation> {
	return Observable.of(EXAMPLE_LOCATION);
    }

    getPosts(key: string, page: number = 0): Observable<EasyPagination<ViewPost>> {
	return Observable.of(EXAMPLE_POSTS_PAGINATION);
    }

    addPost(post: SubmissionPost): Observable<boolean> {
	return Observable.of(true);
    }
}
