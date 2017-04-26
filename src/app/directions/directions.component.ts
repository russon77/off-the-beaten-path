import { Component, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';
import { GeolocationService } from '../services/geolocation.service';
import { BackendService } from '../services/backend.service';
import { SettingsService } from '../services/settings.service';

import { Directions } from '../models/directions.model';
import { TargetLocation } from '../models/target.model';
import { LatLngPosition } from '../models/position.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-directions',
    templateUrl: './directions.component.html',
    styleUrls: ['./directions.component.css', '../common.css']
})
export class DirectionsComponent implements OnInit {

    public directions: Directions;
    public target: TargetLocation;

    public closeEnough: boolean = false;

    private _lastKnownLocation: LatLngPosition;

    private _automaticUpdateSubscription: Subscription;

    constructor(private locationService: GeolocationService,
		private backendService: BackendService,
		private settings: SettingsService) { }

    public ngOnInit() {
	this.locationService
            .getCurrentPosition()
            .switchMap(
		position => {
                    this._lastKnownLocation = position;
		    // could zip this with Observable.of(position)
                    return this.backendService.getTargetLocation(position);
		}
            )
            .subscribe(
		success => {
                    const directions = new Directions(
			this._lastKnownLocation,
			success.position
                    );

                    this.directions = directions;

                    this.target = success;

                    if (this.directions.distance < 50) {
			console.log('DirectionsComponent', 'Within reach!');

			this.closeEnough = true;
                    }
		},
		error => {
                    console.log('DirectionsComponent', error);
		}
            );
    }

    public onManualUpdate() {
	this.locationService
	    .getCurrentPosition()
	    .subscribe(
		success => {
		    const directions = new Directions(
			success,
			this.target.position
		    );

		    this.directions = directions;

		    if (this.directions.distance < 50) {
			console.log('DirectionsComponent', 'Within reach!');

			this.closeEnough = true;
		    }
		},
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
				position => {
				    const directions = new Directions(
					position,
					this.target.position
				    );

				    this.directions = directions;

				    if (this.directions.distance < 50) {
					console.log('DirectionsComponent', 'Within reach!');

					this.closeEnough = true;
				    }
				}
			    );
		    } else {
			if (this._automaticUpdateSubscription) {
			    this._automaticUpdateSubscription.unsubscribe();
			}
		    }
		}
	    );
    }

    public update() {
        this.locationService
	    .getCurrentPosition()
	    .switchMap(
		position => {
		    this._lastKnownLocation = position;
		    // could zip this with Observable.of(position)
		    return this.backendService.getTargetLocation(position);
		}
	    )
	    .subscribe(
		success => {
		    const directions = new Directions(
			this._lastKnownLocation,
			success.position
		    );

		    this.directions = directions;

		    this.target = success;

		    if (this.directions.distance < 50) {
			console.log('DirectionsComponent', 'Within reach!');

			this.closeEnough = true;
		    }
		},
		error => {
		    console.log('DirectionsComponent', error);
		}
	    );
    }
}
