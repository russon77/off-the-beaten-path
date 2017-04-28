import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@angular/material';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    declarations: [ HeaderComponent ],
	    imports: [
		MaterialModule,
		RouterTestingModule
	    ],
	    schemas: []
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(HeaderComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();

	de = fixture.debugElement.query(By.css('a'));
	el = de.nativeElement;
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });

    it('should show a link to the index', () => {
	expect(el.textContent).toContain('Off the Beaten Path');
	expect(el.getAttribute('href')).toBe('/');
    });
});
