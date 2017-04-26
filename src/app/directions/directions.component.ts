import { Component, OnInit, OnDestroy } from '@angular/core';

import { GameService } from '../services/game.service';
import { GeolocationService } from '../services/geolocation.service';
import { BackendService } from '../services/backend.service';
import { SettingsService } from '../services/settings.service';

import { Directions } from '../models/directions.model';
import { TargetLocation } from '../models/target.model';
import { LatLngPosition } from '../models/position.model';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/zip';

@Component({
    selector: 'app-directions',
    templateUrl: './directions.component.html',
    styleUrls: ['./directions.component.css', '../common.css']
})
export class DirectionsComponent implements OnInit, OnDestroy {

    public directions: Directions;
    public target: TargetLocation;

    public closeEnough: boolean = false;

    private _automaticUpdateSubscription: null | Subscription = null;

    constructor(private locationService: GeolocationService,
		private backendService: BackendService,
		private settings: SettingsService) { }

    public updateDirections(updatedPosition: LatLngPosition): void {
	const directions = new Directions(
	    updatedPosition,
	    this.target.position
	);

	this.directions = directions;

	if (this.directions.distance < 50) {
	    console.log('DirectionsComponent', 'Within reach!');

	    this.closeEnough = true;
	}
    }	

    public ngOnInit() {
	this.locationService
            .getCurrentPosition()
            .switchMap(
		position => {
                    return this.backendService
			.getTargetLocation(position)
			.zip(
			    Observable.of(position)
			);
		}
            )
            .subscribe(
		success => {
		    const [target, position] = success;

		    this.target = target;

		    this.updateDirections(position);
		},
		error => {
                    console.log('DirectionsComponent', error);
		}
            );
    }

    public ngOnDestroy() {
	if (null !== this._automaticUpdateSubscription) {
	    this._automaticUpdateSubscription.unsubscribe();
	}
    }

    public onManualUpdate() {
	this.locationService
	    .getCurrentPosition()
	    .subscribe(
		value => this.updateDirections(value),
		error => {
		    console.log('DirectionsComponent', error);
		}
	    );
    }

    public automaticUpdate() {
	this.settings
	    .doConstantUpdateEvents
	    .subscribe(
		value => {
		    if (value) {
			this._automaticUpdateSubscription = this.locationService
			    .watchPosition()
			    .subscribe(
				value => this.updateDirections(value)
			    );
		    } else {
			if (null !== this._automaticUpdateSubscription) {
			    this._automaticUpdateSubscription.unsubscribe();
			    this._automaticUpdateSubscription = null;
			}
		    }
		}
	    );
    }
}
