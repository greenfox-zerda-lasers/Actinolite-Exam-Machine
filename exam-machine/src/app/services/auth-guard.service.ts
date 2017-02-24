import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';
import { ActivateService } from './activate.service';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private activateService: ActivateService) { }

  canActivate() {
    return this.loginService.isLoggedIn();
  };

  canActivateChild() {
    return this.activateService.checkAuth();
  };

}
