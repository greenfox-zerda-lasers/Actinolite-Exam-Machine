import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    DataService,
    AuthGuardService
  ]
})

export class DashboardComponent implements OnInit {

  logOut() {
    console.log('logout success');
    localStorage.clear();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  constructor(private router: Router, private dataService: DataService, private authService: AuthGuardService) { }

  ngOnInit() {
    this.router.navigateByUrl('/dashboard/' + localStorage.getItem("usertype"));
  }

}
