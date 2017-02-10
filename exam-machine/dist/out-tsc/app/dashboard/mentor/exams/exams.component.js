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
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';
var ExamsComponent = (function () {
    function ExamsComponent(dataService, alert) {
        this.dataService = dataService;
        this.alert = alert;
        this.exams = [];
        this.classes = [];
        this.cohorts = [];
        this.examType = 'exam';
        this.errorAlert = false;
        this.successAlert = false;
    }
    ExamsComponent.prototype.renderExams = function () {
        var _this = this;
        this.dataService.fetchExams()
            .toPromise()
            .then(function (data) { return _this.exams = data.exams; });
    };
    ;
    ExamsComponent.prototype.setLive = function () {
        var _this = this;
        this.dataService.setExamStatus(this.current_id, "live")
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ;
    ExamsComponent.prototype.archiveExam = function () {
        var _this = this;
        this.dataService.setExamStatus(this.current_id, "archived")
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ;
    ExamsComponent.prototype.activateExam = function () {
        var _this = this;
        this.dataService.setExamStatus(this.current_id, "draft")
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ExamsComponent.prototype.submitExam = function (name, description, duration, repo, classname) {
        var _this = this;
        this.dataService.addNewExam(name, description, this.examType, repo, duration, classname, localStorage.getItem("userid"))
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ;
    ExamsComponent.prototype.displayResponse = function () {
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
    ExamsComponent.prototype.setCohort = function (value) {
        for (var _i = 0, _a = this.cohorts; _i < _a.length; _i++) {
            var cohort = _a[_i];
            if (cohort.cohort_name === value) {
                this.current_cohort = cohort.cohort_id;
            }
        }
    };
    ;
    ExamsComponent.prototype.setType = function (value) {
        this.examType = value;
    };
    ExamsComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ;
    ExamsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderExams();
        this.dataService.fetchClasses()
            .toPromise()
            .then(function (data) { _this.classes = data.classes, _this.cohorts = data.cohorts, _this.current_cohort = _this.cohorts[0].cohort_id; });
    };
    return ExamsComponent;
}());
ExamsComponent = __decorate([
    Component({
        selector: 'app-exams',
        templateUrl: './exams.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './exams.component.css'
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService])
], ExamsComponent);
export { ExamsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/exams/exams.component.js.map