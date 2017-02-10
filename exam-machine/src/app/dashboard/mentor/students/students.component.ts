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
  cohorts;
  studentIdToDelete;


  renderStudents() {
    this.dataService.fetchStudents()
      .toPromise()
      .then((data) => { this.users = data.students , this.cohorts = data.cohorts })
      .then(() => console.log(this.users));
  }

  getStudentIdToDelete(value) {
    this.studentIdToDelete = value;
    console.log(this.studentIdToDelete);
  }

  deleteStudent() {
    console.log('delete request sent');
    this.dataService.deleteStudent(this.studentIdToDelete)
      .toPromise()
      .then(() => this.renderStudents());
  }

  constructor(private dataService: DataService, private alert: AlertService) { }

  ngOnInit() {
    this.renderStudents();
  }

}
