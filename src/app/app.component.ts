import { Component } from '@angular/core';

import { GeolocationService } from './services/geolocation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    constructor(private locationService: GeolocationService) {
	(<any>window).loading_screen.finish();

	locationService.watchPosition().subscribe(
	    success => console.log(success),
	    error => console.log(error),
	    () => console.log('completed')
	);
    }
}
