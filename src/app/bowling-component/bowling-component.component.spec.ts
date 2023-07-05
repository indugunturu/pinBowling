import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingComponentComponent } from './bowling-component.component';

describe('BowlingComponentComponent', () => {
  let component: BowlingComponentComponent;
  let fixture: ComponentFixture<BowlingComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BowlingComponentComponent]
    });
    fixture = TestBed.createComponent(BowlingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
