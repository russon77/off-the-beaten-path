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

    let nl: NodeListOf<Element>;

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
	const dialogRef = dialog.open(ShareDialogComponent);

	component = dialogRef.componentInstance;

	nl = overlayContainerElement.getElementsByTagName("app-share-dialog");
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });

    it('should create the element in the dom', () => {
	expect(nl.length).toBe(1);
    });

    it('should display the share buttons', () => {
	let buttonsNl = nl[0].getElementsByTagName('share-buttons');
	expect(buttonsNl.length).toBe(1);
    });
});
