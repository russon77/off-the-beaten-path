import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

@Component({
    selector: 'app-settings-and-help',
    templateUrl: './settings-and-help.component.html',
    styleUrls: ['./settings-and-help.component.css', '../common.css']
})
export class SettingsAndHelpComponent implements OnInit {

    public doConstantUpdates: boolean;

    constructor(private settings: SettingsService) { }

    ngOnInit() {
	this.settings
	    .doConstantUpdateEvents
	    .subscribe(
		value => {
		    this.doConstantUpdates = value;
		}
	    );
    }

    public toggleDoConstantUpdates() {
	this.settings.doConstantUpdate = !this.doConstantUpdates;
    }
}
