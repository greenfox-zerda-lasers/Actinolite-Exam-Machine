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
var PastexamsComponent = (function () {
    function PastexamsComponent(dataService, alert) {
        this.dataService = dataService;
        this.alert = alert;
        this.previous = [];
    }
    PastexamsComponent.prototype.renderPrevious = function () {
        var _this = this;
        this.dataService.getPreviousById(localStorage.getItem('userid'))
            .toPromise()
            .then(function (data) { return _this.previous = data.result; })
            .then(function () { return _this.addPercents(_this.previous); })
            .catch(this.handleError);
    };
    ;
    PastexamsComponent.prototype.addPercents = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            item.percent = this.calculate(item.exam_auto_score, item.exam_subj_score, item.exam_auto_score_max, item.exam_subj_score_max);
        }
    };
    PastexamsComponent.prototype.calculate = function (autoscore, subjscore, automax, subjmax) {
        return Math.floor((autoscore + subjscore) / (automax + subjmax) * 100);
    };
    ;
    PastexamsComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ;
    PastexamsComponent.prototype.ngOnInit = function () {
        this.renderPrevious();
    };
    return PastexamsComponent;
}());
PastexamsComponent = __decorate([
    Component({
        selector: 'app-pastexams',
        templateUrl: './pastexams.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../../mentor/mentor.component.css',
            './pastexams.component.css'
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService])
], PastexamsComponent);
export { PastexamsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/student/pastexams/pastexams.component.js.map