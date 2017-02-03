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
var MentorComponent = (function () {
    function MentorComponent(router) {
        this.router = router;
        this.name = 'My Dearest Mentor';
    }
    MentorComponent.prototype.navigate = function (page) {
        this.router.navigateByUrl('/dashboard' + page);
    };
    MentorComponent.prototype.ngOnInit = function () {
        this.router.navigateByUrl('/dashboard/cohorts');
    };
    return MentorComponent;
}());
MentorComponent = __decorate([
    Component({
        selector: 'app-mentor',
        templateUrl: './mentor.component.html',
        styleUrls: [
            '../dashboard.component.css',
            './mentor.component.css'
        ]
    }),
    __metadata("design:paramtypes", [Router])
], MentorComponent);
export { MentorComponent };
//# sourceMappingURL=../../../../../src/app/dashboard/mentor/mentor.component.js.map