var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';
import { ActivateService } from '../activate.service';
var DashboardComponent = (function () {
    function DashboardComponent(router, dataService, loginService, activateService) {
        this.router = router;
        this.dataService = dataService;
        this.loginService = loginService;
        this.activateService = activateService;
    }
    DashboardComponent.prototype.logOut = function () {
        console.log('logout success');
        this.loginService.logout();
        this.router.navigateByUrl('/');
    };
    ;
    DashboardComponent.prototype.ngOnInit = function () {
        this.router.navigateByUrl('/dashboard/' + localStorage.getItem('usertype'));
        console.log(this.loginService.isLoggedIn());
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css'],
        providers: [
            DataService,
            LoginService,
            ActivateService
        ]
    }),
    __metadata("design:paramtypes", [Router,
        DataService,
        LoginService,
        ActivateService])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=../../../../src/app/dashboard/dashboard.component.js.map