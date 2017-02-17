import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class ActivateService {

  constructor(
    private router: Router) { }

  private isAuth:boolean = false;

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

}
