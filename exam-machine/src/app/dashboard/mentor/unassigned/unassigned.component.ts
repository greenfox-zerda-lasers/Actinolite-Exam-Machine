import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AlertService } from '../../../services/alert.service';
import { MentorComponent } from './../mentor.component';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './unassigned.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})

export class UnassignedComponent implements OnInit {

  @Output('update')
  trigger:EventEmitter<string> = new EventEmitter();

  unassigned = [];
  classes = [];
  cohorts = [];
  current_cohort:number;
  current_student:number;
  // current_class;

  response;

  renderUnassigned() {
    console.log('rendering child')
    this.dataService.fetchUnassigned()
      .toPromise()
      .then((data) => this.unassigned = data.students)
    this.getClasses();
  };

  getClasses() {
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => {this.classes = data.classes, this.cohorts = data.cohorts, this.current_cohort = this.cohorts[0].cohort_id})
  };

  setStudent(id) {
    this.current_student = id;
  };

  setCohort(value) {
    for (let cohort of this.cohorts) {
      if (cohort.cohort_name === value) {
        this.current_cohort = cohort.cohort_id;
      }
    }
  };

  setClass(classname) {
    let classid;
    console.log(classname)
    for (let item of this.classes) {
      if (item.class_name === classname) {
        classid = item.class_id;
      }
    };
    console.log(classid)
    console.log(this.current_student)
    this.dataService.assignStudentToClass(this.current_student, classid)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse())
  };

  displayResponse() {
    this.renderUnassigned();
    this.trigger.emit('render');
    console.log('Rendering done, evaluating response')
    if (this.response.status === 'success') {
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
    } else if (this.response.status === 'fail') {
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    } else {
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
    }
  };

  constructor(private dataService: DataService, private alert:AlertService, private mentor: MentorComponent) { }

  ngOnInit() {
    this.renderUnassigned();
  }

}
