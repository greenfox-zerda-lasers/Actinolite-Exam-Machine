import { Component, OnInit } from '@angular/core';
import {DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './students.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})
export class StudentsComponent implements OnInit {

  users;
  cohorts = [];
  studentIdToDelete;
  current_cohort;
  classes = [];

  renderStudents() {
    this.dataService.fetchStudents()
      .toPromise()
      .then((data) => this.users = data.students );
  }

  getStudentIdToDelete(value) {
    this.studentIdToDelete = value;
  }

  setCohort(value) {
    for (let cohort of this.cohorts) {
      if (cohort.cohort_name === value) {
        this.current_cohort = cohort.cohort_id;
      }
    }
  };

  deleteStudent() {
    console.log('delete request sent');
    this.dataService.deleteStudent(this.studentIdToDelete)
      .toPromise()
      .then(() => this.renderStudents());
  }

  constructor(private dataService: DataService, private alert: AlertService) { }

  ngOnInit() {
    this.renderStudents();
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => {this.classes = data.classes, this.cohorts = data.cohorts, this.current_cohort = this.cohorts[0].cohort_id})
      .then(() => console.log('classes: ', this.classes, 'Current cohort', this.current_cohort));
  }

}
