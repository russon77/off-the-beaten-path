import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { LatLngPosition } from '../models/position.model';

@Injectable()
export class GeolocationService {

    private _lastKnownPosition: null | LatLngPosition;
    private _subject: null | Subject<LatLngPosition>;

    constructor() {
	if ('geolocation' in navigator) {
	    this._subject = new Subject<LatLngPosition>();

	    const positionOptions: PositionOptions = {
		enableHighAccuracy: true,
		timeout: Infinity,
		maximumAge: 0
	    };

	    navigator
		.geolocation
		.watchPosition(
		    success => {
			this._subject!.next(new LatLngPosition(success.coords.latitude, success.coords.longitude));
		    },
		    error => {
			if (null !== error) {
			    this._subject!.error(error);
			} 
			else {
			    this._subject!.error('Generic error in getting location.');
			}
		    },
		    positionOptions
		);
	}
	
	// unsupported or denied permissions
	
    }

    getCurrentPosition(): Observable<LatLngPosition> {
	if (null !== this._lastKnownPosition) {
	    return Observable.of(this._lastKnownPosition);
	} else if (null !== this._subject) {
	    return this._subject.take(1);
	}

	return Observable.throw('getCurrentPosition() unavailable');
    }

    watchPosition(): Observable<LatLngPosition> {
	if (null !== this._subject) {
	    return this._subject;
	}

	return Observable.throw('watchPosition() unavailable');
    }
}
