import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: [
    '../pagenotfound/pagenotfound.component.css',
    './unauthorized.component.css'
  ],
  providers: [
    LoginService
  ]
})
export class UnauthorizedComponent implements OnInit {

  navigate() {
    this.loginService.logout();
    this.router.navigateByUrl('/')
  };

  isRoot() {
    if (this.router.url.includes('dashboard')) {
      return false
    }
    else {
      return true
    }
  };

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

}
