import { Component, OnInit, ViewChild } from '@angular/core';
import { UnassignedComponent } from './unassigned/unassigned.component';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import 'rxjs/add/operator/toPromise';

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
  unassignedParent = [];

  reRender(event) {
    if (event = 'render') {
      this.renderUnassigned()
    }
  };

  renderUnassigned() {
    console.log('rendering parent')
    this.dataService.fetchUnassigned()
      .toPromise()
      .then((data) => this.unassignedParent = data.students)
  };

  navigate(page) {
    this.router.navigateByUrl('/dashboard/mentor' + page);
  };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.renderUnassigned();
    this.router.navigateByUrl('/dashboard/mentor/cohorts');
  }

}
