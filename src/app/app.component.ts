import { Component } from '@angular/core';

import { GameService } from './services/game.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private gameService: GameService) {
	this.gameService
	    .initialize()
	    .subscribe(
		success => {
		    (<any>window).loading_screen.finish();
		},
		error => {
		    console.log('AppComponent', error);
		}
	    );
    }
}
