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
var AlertService = (function () {
    function AlertService() {
        this.errorAlert = false;
        this.successAlert = false;
    }
    AlertService.prototype.setStyleTop = function (that) {
        that.top = '50px';
        setTimeout(function () {
            that.top = '-50px';
        }, 3000);
    };
    AlertService.prototype.setStyleHeight = function (that) {
        that.height = 'auto';
        setTimeout(function () {
            that.height = '0px';
        }, 3000);
    };
    AlertService.prototype.displayError = function (that, message, func) {
        that.message = message;
        that.errorAlert = true;
        that.successAlert = false;
        func;
    };
    AlertService.prototype.displaySuccess = function (that, message, func) {
        that.message = message;
        that.successAlert = true;
        that.errorAlert = false;
        func;
    };
    return AlertService;
}());
AlertService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AlertService);
export { AlertService };
//# sourceMappingURL=../../../src/app/alert.service.js.map