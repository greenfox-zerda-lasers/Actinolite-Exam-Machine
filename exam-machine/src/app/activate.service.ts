import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class ActivateService {

  private isAuth:boolean = true;

  setAuth() {
    if (this.router.url.includes(localStorage.getItem('usertype'))) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  };

  checkAuth() {
    return this.isAuth;
  };

  constructor(
    private router: Router) {
      this.isAuth = !!localStorage.getItem('token');
    }

}
