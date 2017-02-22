import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class ActivateService {

  private isAuth:boolean = true;

  checkAuth() {
    if (this.router.url.includes(localStorage.getItem('usertype'))) {
      return true;
    }
    else {
      return false;
    }
  };

  constructor(
    private router: Router) {
      this.isAuth = !!localStorage.getItem('token');
    }

}
