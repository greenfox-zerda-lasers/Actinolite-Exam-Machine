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
import { DataService } from '../../data.service';
var StudentComponent = (function () {
    function StudentComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.name = localStorage.getItem("username");
    }
    StudentComponent.prototype.navigate = function (page) {
        this.router.navigateByUrl('/dashboard/student' + page);
    };
    StudentComponent.prototype.ngOnInit = function () {
        this.router.navigateByUrl('/dashboard/student/examstart');
    };
    return StudentComponent;
}());
StudentComponent = __decorate([
    Component({
        selector: 'app-student',
        templateUrl: './student.component.html',
        styleUrls: [
            '../dashboard.component.css',
            '../mentor/mentor.component.css',
            './student.component.css'
        ],
        providers: [
            DataService
        ]
    }),
    __metadata("design:paramtypes", [Router, DataService])
], StudentComponent);
export { StudentComponent };
//# sourceMappingURL=../../../../../src/app/dashboard/student/student.component.js.map