import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';
import { ActivateService } from '../services/activate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    DataService,
    LoginService,
    ActivateService
  ]
})

export class DashboardComponent implements OnInit {

  logOut() {
    console.log('logout success');
    this.loginService.logout();
    this.router.navigateByUrl('/');
  };

  check() {
    return this.loginService.isLoggedIn();
  };

  constructor(
    private router: Router,
    private dataService: DataService,
    private loginService: LoginService,
    private activateService: ActivateService) { }

  ngOnInit() {
    this.router.navigateByUrl('/dashboard/' + localStorage.getItem('usertype'));
    console.log(localStorage.getItem('usertype'));
    console.log(this.activateService.checkAuth());
  }

}
