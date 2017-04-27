import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/take';

import { LatLngPosition } from '../models/position.model';

const positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
};

@Injectable()
export class GeolocationServiceStub {
    constructor() {}

    getCurrentPosition(): Observable<LatLngPosition> {
	return Observable.throw('getCurrentPosition() unavailable');
    }

    watchPosition(): Observable<LatLngPosition> {
	return Observable.throw('watchPosition() unavailable');
    }

    stopWatching(): void {}
}

@Injectable()
export class GeolocationService {

    private _lastKnownPosition: null | LatLngPosition = null;
    private _subject: null | ReplaySubject<LatLngPosition> = null;
    private _watchId: null | number = null;

    constructor() {}

    getCurrentPosition(): Observable<LatLngPosition> {
	if (null !== this._subject) {
	    return this._subject.take(1);
	} else if ('geolocation' in navigator) {
	    const subject = new Subject<LatLngPosition>();

	    navigator
		.geolocation
		.getCurrentPosition(
		    success => {
			const latest_position = new LatLngPosition(success.coords.latitude, success.coords.longitude);

			subject.next(latest_position);
			this._lastKnownPosition = latest_position;
		    },
		    error => {
			if (null !== error) {
			    subject.error(error);
			} else {
			    subject.error('Generic error in getting location.');
			}
		    },
		    positionOptions
		);

	    return subject;
	}

	return Observable.throw('getCurrentPosition() unavailable');
    }

    watchPosition(): Observable<LatLngPosition> {
	if (null !== this._subject) {
	    return this._subject;
	} else if ('geolocation' in navigator) {
	    this._subject = new ReplaySubject<LatLngPosition>(1);

	    this._watchId = navigator
		.geolocation
		.watchPosition(
		    success => {
			const latest_position = new LatLngPosition(success.coords.latitude, success.coords.longitude);

			this._subject!.next(latest_position);
			this._lastKnownPosition = latest_position;
		    },
		    error => {
			if (null !== error) {
			    this._subject!.error(error);
			} else {
			    this._subject!.error('Generic error in getting location.');
			}
		    },
		    positionOptions
		);

	    return this._subject;
	}

	return Observable.throw('watchPosition() unavailable');
    }

    stopWatching(): void {
	if (null !== this._watchId) {
	    navigator.geolocation.clearWatch(this._watchId);
	}

	if (null !== this._subject) {
	    this._subject.complete();
	    this._subject = null;
	}
    }
}
