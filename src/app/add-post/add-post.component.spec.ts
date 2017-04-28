import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';

import { AddPostComponent } from './add-post.component';

import { GeolocationService, GeolocationServiceStub } from '../services/geolocation.service';
import { BackendService, BackendServiceStub } from '../services/backend.service';

import { RouterStub, ActivatedRouteStub } from '../../../testing/router-stubs';

describe('AddPostComponent', () => {
    let component: AddPostComponent;
    let fixture: ComponentFixture<AddPostComponent>;
    let de: DebugElement;
    let el: HTMLElement;

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
		}
	    ],
	    imports: [
		MaterialModule,
		NgUploaderModule,
		RouterTestingModule,
		FormsModule,
		ReactiveFormsModule,
		NoopAnimationsModule
	    ],
	    schemas: [],
	    declarations: [ AddPostComponent ]
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(AddPostComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();

	de = fixture.debugElement.query(By.css('md-card'));
	el = de.nativeElement;
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });
});
