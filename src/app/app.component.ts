import { Component } from '@angular/core';

import { GameService } from './services/game.service';
import { GeolocationService } from './services/geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private locationService: GeolocationService) {
        this.locationService
            .getCurrentPosition()
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
