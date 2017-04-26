import { Component, OnInit, OnDestroy } from '@angular/core';

import { SettingsService } from '../services/settings.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-settings-and-help',
    templateUrl: './settings-and-help.component.html',
    styleUrls: ['./settings-and-help.component.css', '../common.css']
})
export class SettingsAndHelpComponent implements OnInit, OnDestroy {

    public doConstantUpdates: null | boolean = null;

    private _doConstantUpdateSubscription: null | Subscription = null;

    constructor(private settings: SettingsService) { }

    ngOnInit() {
	this._doConstantUpdateSubscription = this.settings
	    .doConstantUpdateEvents
	    .subscribe(
		value => {
		    this.doConstantUpdates = value;
		}
	    );
    }

    ngOnDestroy() {
	if (null !== this._doConstantUpdateSubscription) {
	    this._doConstantUpdateSubscription.unsubscribe();
	}
    }

    public toggleDoConstantUpdates() {
	this.settings.doConstantUpdate = !this.doConstantUpdates;
    }
}
