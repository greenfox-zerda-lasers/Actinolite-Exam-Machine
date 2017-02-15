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
import { ExamsComponent } from './../exams/exams.component';
import 'rxjs/add/operator/toPromise';
var ResultComponent = (function () {
    function ResultComponent(dataService, alert, exams) {
        this.dataService = dataService;
        this.alert = alert;
        this.exams = exams;
        this.results = [];
        this.name = 'Exam';
        this.percents = [];
    }
    ResultComponent.prototype.renderResults = function () {
        var _this = this;
        this.dataService.getResultsById(this.current_id)
            .toPromise()
            .then(function (data) { _this.results = data.results, _this.name = _this.results[0].exam_name, _this.max = _this.results[0].exam_subj_score_max; })
            .then(function () { return console.log(_this.results); });
    };
    ;
    ResultComponent.prototype.sendScore = function (value) {
        var _this = this;
        console.log(this.current_user);
        if (value > this.max) {
            this.response = { 'status': 'fail', 'message': 'Score can\'t be higher than the maximum!' };
            this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
        }
        else {
            this.dataService.setSubjectiveScore(this.current_id, this.current_user, value)
                .toPromise()
                .then(function (data) { return _this.response = data; })
                .then(function () { return _this.displayResponse(); })
                .catch(this.handleError);
        }
    };
    ;
    ResultComponent.prototype.displayResponse = function () {
        this.renderResults();
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
    ResultComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ;
    ResultComponent.prototype.ngOnInit = function () {
        this.current_id = localStorage.getItem('examid');
        this.renderResults();
    };
    return ResultComponent;
}());
ResultComponent = __decorate([
    Component({
        selector: 'app-result',
        templateUrl: './result.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './result.component.css'
        ],
        providers: [
            DataService,
            AlertService,
            ExamsComponent
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService, ExamsComponent])
], ResultComponent);
export { ResultComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/result/result.component.js.map