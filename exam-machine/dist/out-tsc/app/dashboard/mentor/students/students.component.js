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
var StudentsComponent = (function () {
    function StudentsComponent() {
        this.users = [
            {
                id: '1',
                name: 'Joey Jo',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '2',
                name: 'Angelika Kovacs',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '4',
                name: 'Gomix Bela',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '26',
                name: 'Random Student',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '28',
                name: 'Green Fox',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '30',
                name: 'Kis Vuk',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '31',
                name: 'Typescript Addict',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '33',
                name: 'Lazy Designer',
                cohort: 'Zerda',
                class: 'Lasers'
            }
        ];
    }
    StudentsComponent.prototype.openModal = function () {
    };
    StudentsComponent.prototype.changeClass = function () {
    };
    StudentsComponent.prototype.ngOnInit = function () {
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
        ]
    }),
    __metadata("design:paramtypes", [])
], StudentsComponent);
export { StudentsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/students/students.component.js.map