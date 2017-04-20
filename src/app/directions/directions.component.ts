import { Component, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';
import { GeolocationService } from '../services/geolocation.service';
import { BackendService } from '../services/backend.service';

import { Directions } from '../models/directions.model';
import { TargetLocation } from '../models/target.model';
import { LatLngPosition } from '../models/position.model';

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

    constructor(private locationService: GeolocationService,
        private backendService: BackendService) { }

    public ngOnInit() {
        this.update();
    }

    public onUpdate() {
        this.update();
    }

    public update() {
        this.locationService
            .getCurrentPosition()
            .switchMap(
            position => {
                this._lastKnownLocation = position;
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
