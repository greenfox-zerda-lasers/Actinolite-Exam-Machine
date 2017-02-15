var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    DataService.prototype.userLogin = function (email, password) {
        return this.http.post('https://five-pisces.gomix.me/user/login', { user_email: email, user_password: password }, { headers: this.headers });
    };
    DataService.prototype.userToken = function (token) {
        var head = new Headers({ 'Content-Type': 'application/json' });
        var content = ({
            'token': token
        });
        head.append('token', token);
        return this.http.post('https://five-pisces.gomix.me/token', content, { headers: head });
    };
    DataService.prototype.userSignup = function (name, email, password) {
        return this.http.post('https://five-pisces.gomix.me/user/signup', { user_name: name, user_email: email, user_password: password }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.getUserName = function (id) {
        return this.http.post('https://five-pisces.gomix.me/self', { user_id: id }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchUsers = function () {
        return this.http.get('https://five-pisces.gomix.me/users')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchClasses = function () {
        return this.http.get('https://five-pisces.gomix.me/dashboard/classes')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewClass = function (name) {
        return this.http.post('https://five-pisces.gomix.me/dashboard/classes', { class_name: name }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.assignClassToCohort = function (name, id) {
        return this.http.put('https://five-pisces.gomix.me/dashboard/classes-to-cohorts', { class_name: name, cohort_id: id }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.editClass = function (name) {
        return this.http.put('https://five-pisces.gomix.me/dashboard/classes', { class_name: name }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchCohorts = function () {
        return this.http.get('https://five-pisces.gomix.me/dashboard/cohorts')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewCohort = function (name) {
        return this.http.post('https://five-pisces.gomix.me/dashboard/cohorts', { cohort_name: name }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.editCohort = function (name) {
        return this.http.put('https://five-pisces.gomix.me/dashboard/cohorts', { cohort_name: name }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchStudents = function () {
        return this.http.get('https://five-pisces.gomix.me/dashboard/students')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchUnassigned = function () {
        return this.http.get('https://five-pisces.gomix.me/dashboard/unassigned')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.assignStudentToClass = function (studentid, classid) {
        return this.http.post('https://five-pisces.gomix.me/dashboard/students', { user_id: studentid, class_id: classid }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchExams = function () {
        return this.http.get('https://five-pisces.gomix.me/dashboard/exams')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewExam = function (name, description, repo, duration, classid, userid) {
        return this.http.post('https://five-pisces.gomix.me/dashboard/exams', { exam_name: name, exam_desc: description, exam_duration: duration, exam_repo: repo, exam_creator_id: userid, exam_class: classid }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.changeExamState = function (state) {
        return this.http.put('https://five-pisces.gomix.me/dashboard/exams', { exam_status: state }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    return DataService;
}());
DataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DataService);
export { DataService };
//# sourceMappingURL=../../../src/app/data.service.js.map