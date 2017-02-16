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
import { AuthGuardService } from '../auth-guard.service';
import 'rxjs/add/operator/toPromise';
var LoginComponent = (function () {
    function LoginComponent(dataService, router, authService) {
        this.dataService = dataService;
        this.router = router;
        this.authService = authService;
        this.loadingSpinner = '';
        this.dangerAlert = false;
        this.successAlert = false;
    }
    LoginComponent.prototype.verifyUser = function (loginUser, loginPass) {
        var _this = this;
        this.dataService.userLogin(loginUser, loginPass)
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.navigate(); })
            .catch(this.handleError);
    };
    LoginComponent.prototype.navigate = function () {
        if (this.response.result === 'success') {
            localStorage.setItem("usertype", this.response.user_type);
            localStorage.setItem("username", this.response.user_name);
            this.setStyle();
            this.router.navigateByUrl('/dashboard');
        }
        else if (this.response.result === 'fail') {
            this.setClassDanger(this.response.message);
            this.setStyle();
            console.log(this.response.message);
        }
        else {
            console.log('login error');
            this.setClassDanger('An unknown error occured.');
            this.setStyle();
        }
    };
    LoginComponent.prototype.setSpinnerWithEnter = function () {
        this.loadingSpinner = 'spinner spinner-sm';
    };
    LoginComponent.prototype.setSpinner = function () {
        this.loadingSpinner = '';
    };
    LoginComponent.prototype.setStyle = function () {
        this.height = 'auto';
    };
    LoginComponent.prototype.setClassDanger = function (message) {
        this.message = message;
        this.dangerAlert = true;
        this.successAlert = false;
    };
    LoginComponent.prototype.setClassSuccess = function (message) {
        this.message = message;
        this.successAlert = true;
        this.dangerAlert = false;
    };
    LoginComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
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
            AuthGuardService
        ]
    }),
    __metadata("design:paramtypes", [DataService, Router, AuthGuardService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../src/app/login/login.component.js.map