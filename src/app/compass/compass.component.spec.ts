import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DomSanitizer, By } from '@angular/platform-browser';

import { CompassComponent } from './compass.component';

describe('CompassComponent', () => {
    let component: CompassComponent;
    let fixture: ComponentFixture<CompassComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let sanitizer: DomSanitizer;

    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    declarations: [ CompassComponent ]
	})
	    .compileComponents();
    }));

    beforeEach(() => {
	fixture = TestBed.createComponent(CompassComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();

	de = fixture.debugElement.query(By.css('img'));
	el = de.nativeElement;

	sanitizer = fixture.debugElement.injector.get(DomSanitizer);
    });

    it('should create', () => {
	expect(component).toBeTruthy();
    });

    it('should configure the correct rotation', () => {
	let rotation = 90, safeStyle = sanitizer.bypassSecurityTrustStyle(`rotate(90deg)`);

	component.rotation = rotation;
	
	expect(component.safeTransform)
	    .toEqual(safeStyle);
	
	fixture.detectChanges();

	expect(el.style.transform).toContain('rotate(90deg)');

	expect(el.style.transform).not.toContain('rotate(100deg)');
    });
});
