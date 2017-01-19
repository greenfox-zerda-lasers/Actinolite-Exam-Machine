import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logOut() {
    console.log('logout success');
    this.router.navigateByUrl('/');
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
