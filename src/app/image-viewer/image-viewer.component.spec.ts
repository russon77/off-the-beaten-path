import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdDialogModule, MdDialog, OverlayContainer, MaterialModule } from '@angular/material';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ImageViewerComponent } from './image-viewer.component';

@NgModule({
    declarations: [ImageViewerComponent],
    exports: [ImageViewerComponent],
    entryComponents: [ImageViewerComponent],
    imports: [
	MdDialogModule,
	NoopAnimationsModule,
	CommonModule
    ],
    schemas: []
})
class DialogTestModule { }


describe('ImageViewerComponent', () => {
    let component: ImageViewerComponent;
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
	const dialogRef = dialog.open(ImageViewerComponent);

	component = dialogRef.componentInstance;
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });


});
