import { Component, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';

import { Directions } from '../models/directions.model';
import { TargetLocation } from '../models/target.model';

@Component({
    selector: 'app-directions',
    templateUrl: './directions.component.html',
    styleUrls: ['./directions.component.css', '../common.css']
})
export class DirectionsComponent implements OnInit {

    public directions: Directions;
    public target: TargetLocation;
    
    public closeEnough: boolean = false;

    constructor(private gameService: GameService) { }

    ngOnInit() {
	this.update();
    }

    onUpdate() {
	this.update();
    }

    update() {
	this.gameService
	    .update()
	    .subscribe(
		success => {
		    this.directions = success;

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
