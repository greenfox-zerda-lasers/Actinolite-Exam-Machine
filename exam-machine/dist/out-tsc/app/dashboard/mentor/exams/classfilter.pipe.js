var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (value, args) {
        var cohort = args;
        return value.filter(function (item) {
            return item.cohort_id === cohort;
        });
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    Pipe({
        name: 'FilterPipe'
    })
], FilterPipe);
export { FilterPipe };
//# sourceMappingURL=../../../../../../src/app/dashboard/mentor/exams/classfilter.pipe.js.map