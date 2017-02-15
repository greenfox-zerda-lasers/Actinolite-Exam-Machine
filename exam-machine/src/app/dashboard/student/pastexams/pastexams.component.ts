import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-pastexams',
  templateUrl: './pastexams.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../../mentor/mentor.component.css',
    './pastexams.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})

export class PastexamsComponent implements OnInit {

  previous = <any>[];

  renderPrevious() {
    this.dataService.getPreviousById(localStorage.getItem('userid'))
      .toPromise()
      .then((data) => this.previous = data.result)
      .then(() => this.addPercents(this.previous))
      .catch(this.handleError)
  };

  addPercents(arr) {
    for (let item of arr) {
      item.percent = this.calculate(item.exam_auto_score, item.exam_subj_score, item.exam_auto_score_max, item.exam_subj_score_max)
    }
  }

  calculate(autoscore, subjscore, automax, subjmax) {
    return Math.floor((autoscore + subjscore) / (automax + subjmax) * 100)
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(private dataService: DataService, private alert: AlertService) {
  }

  ngOnInit() {
    this.renderPrevious()
  }

}
