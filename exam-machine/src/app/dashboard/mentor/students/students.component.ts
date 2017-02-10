import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './students.component.css'
  ]
})
export class StudentsComponent implements OnInit {

  users = [];

  currentUser;
  username;

  openModal() {

  }

  changeClass() {

    // offers to change the class of the current student
    // sends PUT request to the USERS_CLASSES datatable to update student class
  }

  constructor() { }

  ngOnInit() {
  }

}
