import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY = 'OTBP_SETTINGS_DO_CONSTANT_UPDATE';

@Injectable()
export class SettingsService {

    private _doConstantUpdateEventEmitter = new ReplaySubject<boolean>(1);

    public set doConstantUpdate(value: boolean) {
	this._doConstantUpdateEventEmitter.next(value);

	localStorage.setItem(DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY, JSON.stringify(value));
    }

    public get doConstantUpdateEvents(): Observable<boolean> {
	return this._doConstantUpdateEventEmitter;
    }

    constructor() {
	const storedValue = localStorage.getItem(DO_CONSTANT_UPDATE_LOCALSTORAGE_KEY);
	if (null !== storedValue) {
	    this._doConstantUpdateEventEmitter.next(JSON.parse(storedValue));
	} else {
	    this._doConstantUpdateEventEmitter.next(false);
	}
    }

}
