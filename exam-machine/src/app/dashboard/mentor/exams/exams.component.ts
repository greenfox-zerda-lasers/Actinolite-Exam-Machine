import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './exams.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})

export class ExamsComponent implements OnInit {

  exams = [];
  classes = [];
  cohorts = [];
  current_cohort; // used to flter classes
  examType = 'exam';

  current_id; // select exam by id

  response;
  top; // alert show and hide

  errorAlert:boolean = false;
  successAlert:boolean = false;

  renderExams() {
    this.dataService.fetchExams()
    .toPromise()
    .then((data) => this.exams = data.exams)
  };

  setLive() {
    this.dataService.setExamStatus(this.current_id, "live")
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
      .catch(this.handleError)
  };

  archiveExam() {
    this.dataService.setExamStatus(this.current_id, "archived")
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
      .catch(this.handleError)
  };

  submitExam(name, description, duration, repo, classname) {
    this.dataService.addNewExam(name, description, this.examType, repo, duration, classname, localStorage.getItem("userid"))
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
      .catch(this.handleError)
  };

  displayResponse() {
    this.renderExams();
    console.log('Rendering done, evaluating response')
    if (this.response.result === 'success') {
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
    } else if (this.response.result === 'fail') {
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    } else {
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
    }
  };

  setCohort(value) {
    for (let cohort of this.cohorts) {
      if (cohort.cohort_name === value) {
        this.current_cohort = cohort.cohort_id;
      }
    }
  };

  setType(value) {
    this.examType = value;
  };

  resultId(value) {
    localStorage.setItem("examid", value);
  }

  navigate(page) {
    this.router.navigateByUrl('/dashboard/mentor' + page);
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(private dataService: DataService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.renderExams();
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => {this.classes = data.classes, this.cohorts = data.cohorts, this.current_cohort = this.cohorts[0].cohort_id})
  }
}
