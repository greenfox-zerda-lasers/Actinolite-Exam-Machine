import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable()

export class ActivateService implements CanActivate {

  constructor(private authService: AuthGuardService) { }

  canActivate() {
    return this.authService.isLoggedIn;
  }

}
