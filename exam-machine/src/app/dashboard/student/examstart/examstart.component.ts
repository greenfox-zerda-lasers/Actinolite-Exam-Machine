import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-examstart',
  templateUrl: './examstart.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../../mentor/mentor.component.css',
    './examstart.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})
export class ExamstartComponent implements OnInit {

  student_repo;
  exam_id;

  response;
  top;

  exams = [];

  renderExams() {
    return this.dataService.getExamById(localStorage.getItem('userid'))
      .toPromise()
      .then((data) => this.exams = data.result)
      .then(() => console.log(this.exams))
      .catch(this.handleError)
  };

  submitRepo() {
    this.dataService.submitExam(this.exam_id, localStorage.getItem('userid'), this.student_repo)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
      .catch(this.handleError)
  };

  displayResponse() {
    this.renderExams();
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
    private alert:AlertService) { }

  ngOnInit() {
    this.renderExams();
  }

}
