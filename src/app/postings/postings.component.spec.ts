import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MdDialog } from '@angular/material';

import { PostingsComponent } from './postings.component';

import { BackendService, BackendServiceStub } from '../services/backend.service';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { MdDialogStub } from '../../../testing/material-stubs';

describe('PostingsComponent', () => {
    let component: PostingsComponent;
    let fixture: ComponentFixture<PostingsComponent>;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    providers: [
		{
		    provide: BackendService,
		    useClass: BackendServiceStub
		},
		{
		    provide: ActivatedRoute,
		    useClass: ActivatedRouteStub
		},
		{
		    provide: MdDialog,
		    useClass: MdDialogStub
		}
	    ],
	    declarations: [ PostingsComponent ],
	    schemas: [
		NO_ERRORS_SCHEMA
	    ]
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(PostingsComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });
});
