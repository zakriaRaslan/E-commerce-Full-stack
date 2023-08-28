import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccInfoComponent } from './acc-info.component';

describe('AccInfoComponent', () => {
  let component: AccInfoComponent;
  let fixture: ComponentFixture<AccInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccInfoComponent]
    });
    fixture = TestBed.createComponent(AccInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
