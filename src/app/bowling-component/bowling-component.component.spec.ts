import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BowlingComponentComponent } from './bowling-component.component';

describe('BowlingComponentComponent', () => {
  let component: BowlingComponentComponent;
  let fixture: ComponentFixture<BowlingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlingComponentComponent ],
      imports:[FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 when all rolls are zeros', () => {
    addFrames(10,0,0); // All failed frames with 0-0 score
    expect(component.score).toEqual(0);
  });

  it('should return 20 when all rolls are ones', () => {
    addFrames(10,1,1); // All open frames with 1-1 score
    expect(component.score).toEqual(20);
  });

   it('calculate correct score for a spare', () => {
    addFrames(1,5,5);// Frame 1
    addFrames(1,1,0);// Frame 2
    addFrames(8,0,0);// Frame 3 to 10
    expect(component.score).toEqual(12);
  })

  it('calculate correct score for a strike', () => {
      addFrames(1,10);// Frame 1
      addFrames(1,1,1);// Frame 2
      addFrames(8,0,0);// Frame 3 to 10
      expect(component.score).toEqual(14);

  });

  it('game with all srtikes', () => {
    addFrames(9,10);// Frame 1 to 9
    addFrames(1,10,10,10);// 10th frame
    expect(component.score).toEqual(300);
  });

  function addFrames(frames:number, firstRoll:number, secondRoll?:number, thirdRoll?:number){
    for(let i=0;i<frames;i++){
      component.bowlingForm.first = firstRoll;
      component.bowlingForm.second = secondRoll;
      component.bowlingForm.third = thirdRoll;
      component.showScore();
    }
  }

});


