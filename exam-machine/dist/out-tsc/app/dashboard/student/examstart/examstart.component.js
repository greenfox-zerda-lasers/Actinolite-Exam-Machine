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
var ExamstartComponent = (function () {
    function ExamstartComponent(dataService, alert) {
        this.dataService = dataService;
        this.alert = alert;
        this.exams = [];
    }
    ExamstartComponent.prototype.renderExams = function () {
        var _this = this;
        return this.dataService.getExamById(localStorage.getItem('userid'))
            .toPromise()
            .then(function (data) { return _this.exams = data.result; })
            .then(function () { return console.log(_this.exams); })
            .catch(this.handleError);
    };
    ;
    ExamstartComponent.prototype.submitRepo = function () {
        var _this = this;
        this.dataService.submitExam(this.exam_id, localStorage.getItem('userid'), this.student_repo)
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); })
            .catch(this.handleError);
    };
    ;
    ExamstartComponent.prototype.displayResponse = function () {
        this.renderExams();
        console.log('Rendering done, evaluating response');
        if (this.response.status === 'success') {
            this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
        }
        else if (this.response.status === 'fail') {
            this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
        }
        else {
            this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
        }
    };
    ;
    ExamstartComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ;
    ExamstartComponent.prototype.ngOnInit = function () {
        this.renderExams();
    };
    return ExamstartComponent;
}());
ExamstartComponent = __decorate([
    Component({
        selector: 'app-examstart',
        templateUrl: './examstart.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../../mentor/mentor.component.css',
            './examstart.component.css'
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService])
], ExamstartComponent);
export { ExamstartComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/student/examstart/examstart.component.js.map