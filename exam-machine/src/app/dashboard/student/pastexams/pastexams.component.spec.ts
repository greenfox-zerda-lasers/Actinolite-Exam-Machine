/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PastexamsComponent } from './pastexams.component';

describe('PastexamsComponent', () => {
  let component: PastexamsComponent;
  let fixture: ComponentFixture<PastexamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastexamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
