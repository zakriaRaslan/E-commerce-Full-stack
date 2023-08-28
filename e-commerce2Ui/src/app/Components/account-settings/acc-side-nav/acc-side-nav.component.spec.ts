import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccSideNavComponent } from './acc-side-nav.component';

describe('AccSideNavComponent', () => {
  let component: AccSideNavComponent;
  let fixture: ComponentFixture<AccSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccSideNavComponent]
    });
    fixture = TestBed.createComponent(AccSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
