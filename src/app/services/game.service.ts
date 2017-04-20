import { Injectable } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GeolocationService } from './geolocation.service';
import { BackendService } from './backend.service';

import { Directions } from '../models/directions.model';
import { LatLngPosition } from '../models/position.model';

@Injectable()
export class GameService {

    private _lastKnownLocation: LatLngPosition;
    private _automaticLocationUpdates: boolean = false;

    constructor(private locationService: GeolocationService,
		private backendService: BackendService) { }

    public initialize(): Observable<Directions> {
	const observable = this.locationService
	    .getCurrentPosition()
	    .switchMap(
		position => {
		    this._lastKnownLocation = position;
		    return this.backendService.getTargetLocation(position);
		}
	    )
	    .map(
		target => new Directions(
		    this._lastKnownLocation,
		    target.position
		)
	    )
	    .share();

	return observable;
    }

    public update(): Observable<Directions> {
	return this.locationService
	    .getCurrentPosition()
	    .switchMap(
		position => {
		    this._lastKnownLocation = position;
		    return this.backendService.getTargetLocation(position);
		}
	    )
	    .map(
		target => new Directions(
		    this._lastKnownLocation,
		    target.position
		)
	    )
	    .share();
    }
}
