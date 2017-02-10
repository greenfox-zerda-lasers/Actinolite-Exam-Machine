var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import { MentorComponent } from './../mentor.component';
import 'rxjs/add/operator/toPromise';
var UnassignedComponent = (function () {
    function UnassignedComponent(dataService, alert, mentor) {
        this.dataService = dataService;
        this.alert = alert;
        this.mentor = mentor;
        this.trigger = new EventEmitter();
        this.unassigned = [];
        this.classes = [];
        this.cohorts = [];
    }
    UnassignedComponent.prototype.renderUnassigned = function () {
        var _this = this;
        console.log('rendering child');
        this.dataService.fetchUnassigned()
            .toPromise()
            .then(function (data) { return _this.unassigned = data.students; });
        this.getClasses();
    };
    ;
    UnassignedComponent.prototype.getClasses = function () {
        var _this = this;
        this.dataService.fetchClasses()
            .toPromise()
            .then(function (data) { _this.classes = data.classes, _this.cohorts = data.cohorts, _this.current_cohort = _this.cohorts[0].cohort_id; });
    };
    UnassignedComponent.prototype.setStudent = function (id) {
        this.current_student = id;
    };
    ;
    UnassignedComponent.prototype.setCohort = function (value) {
        for (var _i = 0, _a = this.cohorts; _i < _a.length; _i++) {
            var cohort = _a[_i];
            if (cohort.cohort_name === value) {
                this.current_cohort = cohort.cohort_id;
            }
        }
    };
    ;
    UnassignedComponent.prototype.setClass = function (classname) {
        var _this = this;
        var classid;
        console.log(classname);
        for (var _i = 0, _a = this.classes; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.class_name === classname) {
                classid = item.class_id;
            }
        }
        ;
        console.log(classid);
        console.log(this.current_student);
        this.dataService.assignStudentToClass(this.current_student, classid)
            .toPromise()
            .then(function (data) { return _this.response = data; })
            .then(function () { return _this.displayResponse(); });
    };
    ;
    UnassignedComponent.prototype.displayResponse = function () {
        this.renderUnassigned();
        this.trigger.emit('render');
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
    UnassignedComponent.prototype.ngOnInit = function () {
        this.renderUnassigned();
    };
    return UnassignedComponent;
}());
__decorate([
    Output('update'),
    __metadata("design:type", EventEmitter)
], UnassignedComponent.prototype, "trigger", void 0);
UnassignedComponent = __decorate([
    Component({
        selector: 'app-unassigned',
        templateUrl: './unassigned.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './unassigned.component.css'
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService, MentorComponent])
], UnassignedComponent);
export { UnassignedComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/unassigned/unassigned.component.js.map