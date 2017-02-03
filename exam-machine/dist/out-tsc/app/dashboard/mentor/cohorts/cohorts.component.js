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
var CohortsComponent = (function () {
    function CohortsComponent() {
        this.cohorts = [
            {
                name: "Zerda"
            },
            {
                name: "Vellox"
            },
            {
                name: "Boti"
            }
        ];
    }
    CohortsComponent.prototype.addNewCohort = function (newCohort) {
        if (newCohort.value.length > 0) {
            var newcohort = { name: newCohort.value };
            this.cohorts.push(newcohort);
        }
        newCohort.value = "";
    };
    CohortsComponent.prototype.ngOnInit = function () {
    };
    return CohortsComponent;
}());
CohortsComponent = __decorate([
    Component({
        selector: 'app-cohorts',
        templateUrl: './cohorts.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './cohorts.component.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], CohortsComponent);
export { CohortsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/cohorts/cohorts.component.js.map