import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
  providers: [
    LoginService
  ]
})
export class PagenotfoundComponent implements OnInit {

  navigate() {
    if (this.router.url.includes('dashboard') && this.loginService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard/' + localStorage.getItem('usertype'))
    }
    else if (this.router.url.includes('dashboard') && !this.loginService.isLoggedIn()) {
      this.router.navigateByUrl('/')
    }
    else {
      this.router.navigateByUrl('/')
    }
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
