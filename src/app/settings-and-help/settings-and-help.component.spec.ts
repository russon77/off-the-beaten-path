import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAndHelpComponent } from './settings-and-help.component';

describe('SettingsAndHelpComponent', () => {
  let component: SettingsAndHelpComponent;
  let fixture: ComponentFixture<SettingsAndHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAndHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAndHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
