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
import { AlertService } from '../alert.service';
import { LoginService } from '../login.service';
import 'rxjs/add/operator/toPromise';
var LoginComponent = (function () {
    function LoginComponent(dataService, router, loginService, alert) {
        this.dataService = dataService;
        this.router = router;
        this.loginService = loginService;
        this.alert = alert;
        this.loadingSpinner = '';
        this.dangerAlert = false;
        this.successAlert = false;
    }
    LoginComponent.prototype.verifyUser = function (loginUser, loginPass) {
        var _this = this;
        this.loginService.login(loginUser, loginPass)
            .then(function () { return _this.navigate(); });
    };
    ;
    LoginComponent.prototype.navigate = function () {
        if (this.loginService.response.status === 'success') {
            console.log('login success');
            if (this.loginService.response.user_admin === "t") {
                localStorage.setItem('usertype', 'mentor');
            }
            else {
                localStorage.setItem('usertype', 'student');
            }
            ;
            localStorage.setItem("username", this.loginService.response.user_name);
            this.alert.displaySuccess(this, this.loginService.response.message, this.alert.setStyleHeight(this));
            this.router.navigateByUrl('/dashboard');
        }
        else if (this.loginService.response.status === 'fail') {
            this.alert.displayError(this, this.loginService.response.message, this.alert.setStyleHeight(this));
            console.log(this.loginService.response.message);
        }
        else {
            this.alert.displayError(this, 'An unknown error occured', this.alert.setStyleHeight(this));
            console.log('login error');
        }
    };
    ;
    LoginComponent.prototype.setSpinnerWithEnter = function () {
        this.loadingSpinner = 'spinner spinner-sm';
    };
    ;
    LoginComponent.prototype.setSpinner = function () {
        this.loadingSpinner = '';
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [
            DataService,
            AlertService,
            LoginService
        ]
    }),
    __metadata("design:paramtypes", [DataService,
        Router,
        LoginService,
        AlertService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../src/app/login/login.component.js.map