import { Component, OnInit } from '@angular/core';

import { GeolocationService } from './services/geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private locationService: GeolocationService) {}

    ngOnInit() {
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
