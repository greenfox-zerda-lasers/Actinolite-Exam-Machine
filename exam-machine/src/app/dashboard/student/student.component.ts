import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ActivateService } from '../../activate.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: [
    '../dashboard.component.css',
    '../mentor/mentor.component.css',
    './student.component.css'
  ],
  providers: [
    DataService,
    ActivateService
  ]
})
export class StudentComponent implements OnInit {
  name = localStorage.getItem("username");

  navigate(page) {
    this.router.navigateByUrl('/dashboard/student' + page);
  };

  check() {
    return this.activateService.checkAuth();
  };

  constructor(
    private router: Router,
    private dataService: DataService,
    private activateService: ActivateService) { }

  ngOnInit() {
    if (this.check()) {
      this.router.navigateByUrl('/dashboard/student/start');
    }    
  }

}
