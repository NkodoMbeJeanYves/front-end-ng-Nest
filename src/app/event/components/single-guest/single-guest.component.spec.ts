import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGuestComponent } from './single-guest.component';

describe('SingleGuestComponent', () => {
  let component: SingleGuestComponent;
  let fixture: ComponentFixture<SingleGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
