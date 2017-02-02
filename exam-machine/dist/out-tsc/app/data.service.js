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
import { Http } from '@angular/http';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.token = '';
    }
    DataService.prototype.userLogin = function (email, password) {
        return this.http.post('http://localhost:8080/authenticate', { email: email, password: password })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.userToken = function (token) {
        console.log('userToken is called');
        return this.http.post('http://localhost:8080/token', { token: token })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.userSignup = function (name, email, password) {
        return this.http.post('https://exam-machine-backend.gomix.me/user/signup', { name: name, email: email, password: password })
            .map(function (res) { return res.json(); });
    };
    return DataService;
}());
DataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DataService);
export { DataService };
//# sourceMappingURL=../../../src/app/data.service.js.map