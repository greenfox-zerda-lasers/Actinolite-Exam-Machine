/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExamstartComponent } from './examstart.component';

describe('ExamstartComponent', () => {
  let component: ExamstartComponent;
  let fixture: ComponentFixture<ExamstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
