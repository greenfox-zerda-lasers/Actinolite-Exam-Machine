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
var ResultsComponent = (function () {
    function ResultsComponent() {
        this.users = [
            {
                id: '1',
                name: 'Lil Wayne',
                class: 'Lasers',
                cohort: 'Zerda',
                exam: 'HTML/CSS',
                result: '55'
            },
            {
                id: '2',
                name: 'Nicki Minaj',
                class: 'Sparta',
                cohort: 'Zerda',
                exam: 'C++ retake',
                result: '67'
            },
            {
                id: '3',
                name: '50 Cent',
                class: 'Lasers',
                cohort: 'Zerda',
                exam: 'JavaScript',
                result: '99'
            },
            {
                id: '4',
                name: 'Eminem',
                class: 'Raptor',
                cohort: 'Zerda',
                exam: 'Java',
                result: '94'
            },
        ];
    }
    ResultsComponent.prototype.ngOnInit = function () {
    };
    return ResultsComponent;
}());
ResultsComponent = __decorate([
    Component({
        selector: 'app-results',
        templateUrl: './results.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './results.component.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], ResultsComponent);
export { ResultsComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/results/results.component.js.map