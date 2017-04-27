import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdDialogModule, MdDialog, OverlayContainer, MaterialModule } from '@angular/material';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsAndHelpComponent } from './settings-and-help.component';

import { SettingsService } from '../services/settings.service';

@NgModule({
    declarations: [SettingsAndHelpComponent],
    exports: [SettingsAndHelpComponent],
    entryComponents: [SettingsAndHelpComponent],
    imports: [
	MdDialogModule,
	NoopAnimationsModule,
	CommonModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
class DialogTestModule { }


describe('SettingsAndHelpComponent', () => {
    let component: SettingsAndHelpComponent;
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
		},
		SettingsService
	    ],

	})
	    .compileComponents();
    }));

    beforeEach(() => {
	dialog = TestBed.get(MdDialog);
	const dialogRef = dialog.open(SettingsAndHelpComponent);

	component = dialogRef.componentInstance;
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });


});
