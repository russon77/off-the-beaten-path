import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MdDialogModule, MdDialog, OverlayContainer, MaterialModule } from '@angular/material';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ShareDialogComponent } from './share-dialog.component';

@NgModule({
    declarations: [ShareDialogComponent],
    exports: [ShareDialogComponent],
    entryComponents: [ShareDialogComponent],
    imports: [MdDialogModule, NoopAnimationsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
class DialogTestModule { }


describe('ShareDialogComponent', () => {
    let component: ShareDialogComponent;
    let dialog: MdDialog;
    let overlayContainerElement: HTMLElement;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    imports: [DialogTestModule, MdDialogModule.forRoot()],
	    providers: [
		{
		    provide: OverlayContainer, useFactory: () => {
			overlayContainerElement = document.createElement('div');
			return { getContainerElement: () => overlayContainerElement };
		    }
		}
	    ],

	})
	    .compileComponents();
    }));

    beforeEach(() => {
	dialog = TestBed.get(MdDialog);
	let dialogRef = dialog.open(ShareDialogComponent);

	component = dialogRef.componentInstance;
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });


});
