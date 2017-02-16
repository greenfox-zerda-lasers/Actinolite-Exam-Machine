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
var StudentsComponent = (function () {
    function StudentsComponent(dataService, alert) {
        this.dataService = dataService;
        this.alert = alert;
        this.users = [];
        this.cohorts = [];
        this.classes = [];
    }
    StudentsComponent.prototype.renderStudents = function () {
        var _this = this;
        this.dataService.fetchStudents()
            .toPromise()
            .then(function (data) { return _this.users = data.students; });
    };
    ;
    StudentsComponent.prototype.getStudentToDelete = function (id, name) {
        this.studentIdToDelete = id;
        this.studentNameToDelete = name;
    };
    ;
    StudentsComponent.prototype.setCohort = function (value) {
        for (var _i = 0, _a = this.cohorts; _i < _a.length; _i++) {
            var cohort = _a[_i];
            if (cohort.cohort_name === value) {
                this.current_cohort = cohort.cohort_id;
            }
        }
    };
    ;
    StudentsComponent.prototype.deleteStudent = function () {
        var _this = this;
        this.dataService.deleteStudent(this.studentIdToDelete)
            .toPromise()
            .then(function () { return _this.renderStudents(); });
    };
    ;
    StudentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderStudents();
        this.dataService.fetchClasses()
            .toPromise()
            .then(function (data) { _this.classes = data.classes, _this.cohorts = data.cohorts, _this.current_cohort = _this.cohorts[0].cohort_id; });
    };
    return StudentsComponent;
}());
StudentsComponent = __decorate([
    Component({
        selector: 'app-students',
        templateUrl: './students.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './students.component.css'
        ],
        providers: [
            DataService,
            AlertService
        ]
    }),
    __metadata("design:paramtypes", [DataService, AlertService])
], StudentsComponent);
export { StudentsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/students/students.component.js.map