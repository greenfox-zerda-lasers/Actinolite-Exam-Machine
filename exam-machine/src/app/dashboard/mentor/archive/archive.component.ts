import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './archive.component.css',
  ],
  providers: [
    DataService,
    AlertService
  ]
})
export class ArchiveComponent implements OnInit {

  exams = [];
  current_id; // select exam by id

  response;
  top; // alert show and hide

  errorAlert:boolean = false;
  successAlert:boolean = false;

  renderExams() {
    this.dataService.fetchArchived()
    .toPromise()
    .then((data) => this.exams = data.exams)
    // .then(() => console.log(this.exams))
  };

  activateExam() {
    this.dataService.setExamStatus(this.current_id, "draft")
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

  navigate(page) {
    this.router.navigateByUrl('/dashboard/mentor' + page);
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(private dataService:DataService, private alert:AlertService, private router: Router) { }

  ngOnInit() {
    this.renderExams();
  }

}
