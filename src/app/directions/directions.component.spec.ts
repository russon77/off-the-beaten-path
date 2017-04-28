import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { MdDialog } from '@angular/material';
import { MdDialogStub } from '../../../testing/material-stubs';

import { DirectionsComponent } from './directions.component';
import { CompassComponent } from '../compass/compass.component';

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
	    declarations: [
		DirectionsComponent,
		CompassComponent
	    ],
	    imports: [
		MaterialModule,
		CommonModule,
		RouterTestingModule
	    ],
	    schemas: []
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
