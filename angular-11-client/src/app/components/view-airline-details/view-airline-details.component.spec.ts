import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAirlineDetailsComponent } from './view-airline-details.component';

describe('ViewAirlineDetailsComponent', () => {
  let component: ViewAirlineDetailsComponent;
  let fixture: ComponentFixture<ViewAirlineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAirlineDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAirlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
