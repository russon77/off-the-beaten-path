import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDialog } from '@angular/material';
import { MdDialogStub } from '../../../testing/material-stubs';

import { DirectionsComponent } from './directions.component';

import { GeolocationService, GeolocationServiceStub } from '../services/geolocation.service';
import { BackendService, BackendServiceStub } from '../services/backend.service';
import { SettingsService } from '../services/settings.service';

describe('DirectionsComponent', () => {
    let component: DirectionsComponent;
    let fixture: ComponentFixture<DirectionsComponent>;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    providers: [
		{
		    provide: GeolocationService,
		    useClass: GeolocationServiceStub
		},
		{
		    provide: BackendService,
		    useClass: BackendServiceStub
		},
		{
		    provide: MdDialog,
		    useClass: MdDialogStub
		},
		SettingsService
	    ],
	    declarations: [ DirectionsComponent ],
	    schemas: [NO_ERRORS_SCHEMA]
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(DirectionsComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });
});
