import { Component, OnInit } from '@angular/core';
import { frameScore } from './bowligModel';

@Component({
  selector: 'app-bowling-component',
  templateUrl: './bowling-component.component.html',
  styleUrls: ['./bowling-component.component.scss'],
})
export class BowlingComponentComponent  {
  public bowlingForm: frameScore;
  public score: number = 0; // initilize score to 0
  public noOfRolls: Array<number> = [];
  public frameNumber: number = 1; // initilize frame from 1

  constructor() {
    this.bowlingForm = {
      first: 0,
      second: 0,
      third: 0,
    };
  }

  public showScore(): number {
    if (this.frameNumber < 10) {
      if (this.bowlingForm.first === 10) {
        this.noOfRolls.push(this.bowlingForm.first);
      } else {
        this.noOfRolls.push(
          this.bowlingForm.first,
          this.bowlingForm.second ? this.bowlingForm.second : 0
        );
      }
    } else if (this.frameNumber === 10) {
      this.noOfRolls.push(
        this.bowlingForm.first,
        this.bowlingForm.second ? this.bowlingForm.second : 0,
        this.bowlingForm.third ? this.bowlingForm.third : 0
      );
    }

    this.score = this.scoreCalculator(); // score calculation logic Score
    this.frameNumber = this.frameNumber + 1; // Increase frame number on every click
    this.bowlingForm = { first: 0, second: 0, third: 0 }; // Reset form after we show frame number and score
    return this.score; // return score and show in UI
  }
  public scoreCalculator() {
    let score = 0; // block scope
    let rollIndex = 0;
    for (let frameIndex = 0; frameIndex < this.frameNumber; frameIndex++) {
      if (this.isStrike(rollIndex)) {
        score += this.getStrikeBonus(rollIndex);
        rollIndex++;
        continue;
      }
      let frameScore = this.frameScore(rollIndex);
      if (this.isSpare(frameScore)) {
        score += this.getSpareBonus(rollIndex);
      } else {
        score += frameScore;
      }

      rollIndex += 2;
    }
    return score;
  }
  frameScore(rollIndex: number) {
    return (
      (this.noOfRolls[rollIndex] ? this.noOfRolls[rollIndex] : 0) +
      (this.noOfRolls[rollIndex + 1] ? this.noOfRolls[rollIndex + 1] : 0)
    );
  }

  getSpareBonus(rollIndex: number) { //the score is 10 + the number of pins knocked down in the first roll of the following frame.
    return (
      10 + (this.noOfRolls[rollIndex + 2] ? this.noOfRolls[rollIndex + 2] : 0)
    );
  }
  getStrikeBonus(rollIndex: number) { // the score is 10 + the sum of the two rolls in the following frame.
    return (
      10 +
      (this.noOfRolls[rollIndex + 1] ? this.noOfRolls[rollIndex + 1] : 0) +
      (this.noOfRolls[rollIndex + 2] ? this.noOfRolls[rollIndex + 2] : 0)
    );
  }

  isSpare(frameScore: number) { // all 10 pins where knocked down using two rolls.
    return frameScore === 10;
  }

  isStrike(rollIndex: number) { //all 10 pins where knocked down with the first roll.
    return this.noOfRolls[rollIndex] === 10;
  }
}
