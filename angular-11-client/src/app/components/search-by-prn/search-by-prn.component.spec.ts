import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPRNComponent } from './search-by-prn.component';

describe('SearchByPRNComponent', () => {
  let component: SearchByPRNComponent;
  let fixture: ComponentFixture<SearchByPRNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByPRNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPRNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
