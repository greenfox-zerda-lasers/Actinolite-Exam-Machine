import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AlertService } from '../../../services/alert.service';
import { CalculateService } from '../../../services/calculate.service';
import { ExamsComponent } from './../exams/exams.component';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './result.component.css'
  ],
  providers: [
    DataService,
    AlertService,
    CalculateService,
    ExamsComponent
  ]
})

export class ResultComponent implements OnInit {

  results = [];
  name = 'Exam';
  max;
  current_id; // current exam
  current_user;
  current_name;

  percents = [];

  response;
  top;

  renderResults() {
    this.dataService.getResultsById(this.current_id)
      .toPromise()
      .then((data) => {this.results = data.results, this.name=this.results[0].exam_name, this.max=this.results[0].exam_subj_score_max})
      .then(() => (this.calculate.addPercents(this.results)))
      .then(() => console.log(this.results))
  };

  sendScore(value) {
    console.log(this.current_user)
    if (value > this.max) {
      this.response = {'status': 'fail', 'message': 'Score can\'t be higher than the maximum!'}
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    }
    else {
      this.dataService.setSubjectiveScore(this.current_id, this.current_user, value)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
      .catch(this.handleError)
    }
  };

  displayResponse() {
    this.renderResults();
    console.log('Rendering done, evaluating response')
    if (this.response.status === 'success') {
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
    } else if (this.response.status === 'fail') {
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    } else {
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
    }
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(
    private dataService:DataService,
    private alert:AlertService,
    private calculate:CalculateService,
    private exams:ExamsComponent) { }

  ngOnInit() {
    this.current_id = localStorage.getItem('examid');
    this.renderResults();
    // this.name = this.results[0].exam_name;
  }

}
