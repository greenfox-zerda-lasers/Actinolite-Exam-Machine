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
var UnassignedComponent = (function () {
    function UnassignedComponent() {
        this.unassigned = [
            {
                id: '1',
                name: 'Classless Jenny',
                cohort: 'Zerda',
                class: 'Lasers'
            },
            {
                id: '2',
                name: 'Sad Panda',
                cohort: 'Zerda',
                class: 'Lasers'
            },
        ];
    }
    UnassignedComponent.prototype.ngOnInit = function () {
    };
    return UnassignedComponent;
}());
UnassignedComponent = __decorate([
    Component({
        selector: 'app-unassigned',
        templateUrl: './unassigned.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './unassigned.component.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], UnassignedComponent);
export { UnassignedComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/unassigned/unassigned.component.js.map