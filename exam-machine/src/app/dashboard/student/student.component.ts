import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [
    '../dashboard.component.css',
    '../mentor/mentor.component.css',
    './student.component.css'
  ],
  providers: [
    DataService
  ]
})
export class StudentComponent implements OnInit {
  name = localStorage.getItem("username");

  navigate(page) {
    this.router.navigateByUrl('/dashboard/student' + page);
  }

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.router.navigateByUrl('/dashboard/student/start');
  }

}
