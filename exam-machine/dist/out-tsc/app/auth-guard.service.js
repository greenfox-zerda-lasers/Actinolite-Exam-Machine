var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ActivateService } from './activate.service';
var AuthGuard = (function () {
    function AuthGuard(loginService, activateService, router) {
        this.loginService = loginService;
        this.activateService = activateService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        return this.loginService.isLoggedIn();
    };
    ;
    AuthGuard.prototype.canActivateChild = function () {
        this.activateService.setAuth();
        return this.activateService.checkAuth();
    };
    ;
    return AuthGuard;
}());
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoginService,
        ActivateService,
        Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=../../../src/app/auth-guard.service.js.map