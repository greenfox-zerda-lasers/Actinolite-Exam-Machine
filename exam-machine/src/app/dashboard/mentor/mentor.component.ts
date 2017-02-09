import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: [
    '../dashboard.component.css',
    './mentor.component.css'
  ],
  providers: [
    DataService
  ]
})
export class MentorComponent implements OnInit {
  name = localStorage.getItem("username");

  navigate(page) {
    this.router.navigateByUrl('/dashboard/mentor' + page);
  }

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.router.navigateByUrl('/dashboard/mentor/cohorts');
  }

}
