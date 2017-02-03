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
var ClassesComponent = (function () {
    function ClassesComponent() {
        this.cohorts = [{ name: "Zerda" }, { name: "Velox" }];
        this.classes = [
            {
                name: "Laser",
                cohort: "Zerda"
            },
            { name: "Sparta",
                cohort: "Zerda"
            },
            {
                name: "Raptor",
                cohort: "Zerda"
            },
            {
                name: "Valami",
                cohort: "Velox"
            }
        ];
    }
    ClassesComponent.prototype.addNewClass = function (newClassName, newCohortName) {
        if (newClassName.value.length > 0) {
            var newClass = { name: newClassName.value, cohort: newCohortName };
            this.classes.push(newClass);
        }
        newClassName.value = '';
    };
    ClassesComponent.prototype.removeClass = function (index) {
        this.classes.splice(index, 1);
    };
    ClassesComponent.prototype.ngOnInit = function () {
    };
    return ClassesComponent;
}());
ClassesComponent = __decorate([
    Component({
        selector: 'app-class',
        templateUrl: './classes.component.html',
        styleUrls: [
            '../../dashboard.component.css',
            '../mentor.component.css',
            './classes.component.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], ClassesComponent);
export { ClassesComponent };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/classes/classes.component.js.map