import { Injectable } from '@angular/core';

@Injectable()
export class CalculateService {

  calculatePercent(autoscore, subjscore, automax, subjmax) {
    return Math.floor((autoscore + subjscore) / (automax + subjmax) * 100)
  };

  addPercents(arr) {
    for (let item of arr) {
      item.percent = this.calculatePercent(item.exam_auto_score, item.exam_subj_score, item.exam_auto_score_max, item.exam_subj_score_max)
    }
  }

  constructor() { }

}
