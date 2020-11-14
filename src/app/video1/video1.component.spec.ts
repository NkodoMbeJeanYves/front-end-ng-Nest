import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Video1Component } from './video1.component';

describe('Video1Component', () => {
  let component: Video1Component;
  let fixture: ComponentFixture<Video1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Video1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Video1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
