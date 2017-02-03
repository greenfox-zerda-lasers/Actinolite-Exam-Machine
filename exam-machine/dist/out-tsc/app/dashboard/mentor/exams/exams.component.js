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
var ExamsComponent = (function () {
    function ExamsComponent() {
        this.exams = [
            {
                id: '1',
                name: 'JavaScript',
                mentor: 'Envagyok Béla',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '2',
                name: 'C++',
                mentor: 'Nemvagyok Béla',
                cohort: 'Zerda',
                class: 'Sparta'
            },
            {
                id: '3',
                name: 'Java',
                mentor: 'Enpedig Juli',
                cohort: 'Zerda',
                class: 'Raptor'
            }
        ];
        this.cohorts = [
            {
                id: '1',
                name: 'Zerda'
            },
            {
                id: '2',
                name: 'Velox'
            }
        ];
    }
    ExamsComponent.prototype.ngOnInit = function () {
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
        ]
    }),
    __metadata("design:paramtypes", [])
], ExamsComponent);
export { ExamsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/exams/exams.component.js.map