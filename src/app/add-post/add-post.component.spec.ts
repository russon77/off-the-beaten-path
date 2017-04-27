import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';

import { GeolocationService, GeolocationServiceStub } from '../services/geolocation.service';
import { BackendService, BackendServiceStub } from '../services/backend.service';

import { RouterStub, ActivatedRouteStub } from '../../../testing/router-stubs';

describe('AddPostComponent', () => {
    let component: AddPostComponent;
    let fixture: ComponentFixture<AddPostComponent>;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    providers: [
		{
		    provide: GeolocationService,
		    useClass: GeolocationServiceStub
		},
		{
		    provide: Router,
		    useClass: RouterStub
		},
		{
		    provide: ActivatedRoute,
		    useClass: ActivatedRouteStub
		},
		{
		    provide: BackendService,
		    useClass: BackendServiceStub
		}
	    ],
	    schemas: [
		NO_ERRORS_SCHEMA
	    ],
	    declarations: [ AddPostComponent ]
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(AddPostComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });
});
