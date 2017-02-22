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
import { Http, Headers } from '@angular/http';
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.loggedIn = false;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.currentURL = 'https://trytorefaktor.gomix.me';
        this.loggedIn = !!localStorage.getItem('token');
    }
    LoginService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.currentURL + '/login', { user_email: email, user_password: password }, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            localStorage.setItem('token', res.headers.get('token')),
                _this.response = res.json();
        })
            .then(function () {
            if (_this.response.status === "success") {
                _this.loggedIn = true;
            }
        });
    };
    ;
    LoginService.prototype.logout = function () {
        localStorage.clear();
        this.loggedIn = false;
    };
    ;
    LoginService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    ;
    return LoginService;
}());
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], LoginService);
export { LoginService };
//# sourceMappingURL=../../../src/app/login.service.js.map