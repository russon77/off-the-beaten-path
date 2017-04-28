import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule, MdDialog } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PostingsComponent } from './postings.component';

import { BackendService, BackendServiceStub } from '../services/backend.service';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { MdDialogStub } from '../../../testing/material-stubs';

describe('PostingsComponent', () => {
    let component: PostingsComponent;
    let fixture: ComponentFixture<PostingsComponent>;
    let route: ActivatedRouteStub;

    beforeEach(async(() => {
	route = new ActivatedRouteStub();
	route.testParams = {key: 123};
	
	TestBed.configureTestingModule({
	    providers: [
		{
		    provide: BackendService,
		    useClass: BackendServiceStub
		},
		{
		    provide: ActivatedRoute,
		    useValue: route
		},
		{
		    provide: MdDialog,
		    useClass: MdDialogStub
		}
	    ],
	    declarations: [ PostingsComponent ],
	    schemas: [
		
	    ],
	    imports: [
		CommonModule,
		MaterialModule,
		InfiniteScrollModule,
		RouterTestingModule
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
