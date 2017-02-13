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
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';
var ArchiveComponent = (function () {
    function ArchiveComponent(dataService, alert, router) {
        this.dataService = dataService;
        this.alert = alert;
        this.router = router;
        this.exams = [];
        this.errorAlert = false;
        this.successAlert = false;
    }
    ArchiveComponent.prototype.renderExams = function () {
        var _this = this;
        this.dataService.fetchArchived()
            .toPromise()
            .then(function (data) { return _this.exams = data.exams; });
    };
    ;
    ArchiveComponent.prototype.activateExam = function () {
        var _this = this;
        this.dataService.setExamStatus(this.current_id, "draft")
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ;
    ArchiveComponent.prototype.displayResponse = function () {
        this.renderExams();
        console.log('Rendering done, evaluating response');
        if (this.response.result === 'success') {
            this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
        }
        else if (this.response.result === 'fail') {
            this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
        }
        else {
            this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
        }
    };
    ;
    ArchiveComponent.prototype.navigate = function (page) {
        this.router.navigateByUrl('/dashboard/mentor' + page);
    };
    ;
    ArchiveComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ;
    ArchiveComponent.prototype.ngOnInit = function () {
        this.renderExams();
    };
    return ArchiveComponent;
}());
ArchiveComponent = __decorate([
    Component({
        selector: 'app-archive',
        templateUrl: './archive.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './archive.component.css',
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService, Router])
], ArchiveComponent);
export { ArchiveComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/archive/archive.component.js.map