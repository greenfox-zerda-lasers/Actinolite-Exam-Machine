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
        this.currentURL = 'https://exam-machine-backend.gomix.me';
    }
    DataService.prototype.userLogin = function (email, password) {
        return this.http.post(this.currentURL + '/user/login', { user_email: email, user_password: password }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.userSignup = function (name, email, password) {
        return this.http.post(this.currentURL + '/user/signup', { user_name: name, user_email: email, user_password: password }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchUsers = function () {
        return this.http.get(this.currentURL + '/users')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchClasses = function () {
        return this.http.get(this.currentURL + '/dashboard/classes')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewClass = function (name, cohortId) {
        console.log('add new class request sent');
        return this.http.post(this.currentURL + '/dashboard/classes', { class_name: name, cohort_id: cohortId }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.assignClassToCohort = function (name, id) {
        return this.http.put(this.currentURL + '/dashboard/classes-to-cohorts', { class_name: name, cohort_id: id }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.editClass = function (name, cohortId, classId) {
        return this.http.put(this.currentURL + '/dashboard/classes', { class_name: name, cohort_id: cohortId, class_id: classId }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.deleteClass = function (id) {
        return this.http.delete(this.currentURL + '/dashboard/classes/' + id)
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchCohorts = function () {
        return this.http.get(this.currentURL + '/dashboard/cohorts')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewCohort = function (name) {
        return this.http.post(this.currentURL + '/dashboard/cohorts', { cohort_name: name }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.editCohort = function (name, cohortId) {
        return this.http.put(this.currentURL + '/dashboard/cohorts', { cohort_name: name, cohort_id: cohortId }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.deleteCohort = function (name) {
        return this.http.delete(this.currentURL + '/dashboard/cohorts/' + name)
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchStudents = function () {
        return this.http.get(this.currentURL + '/dashboard/students')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.deleteStudent = function (userId) {
        return this.http.delete(this.currentURL + '/dashboard/students/' + userId)
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchUnassigned = function () {
        return this.http.get(this.currentURL + '/dashboard/unassigned')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.assignStudentToClass = function (studentid, classid) {
        return this.http.put(this.currentURL + '/dashboard/students', { user_id: studentid, class_id: classid }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.fetchExams = function () {
        return this.http.get(this.currentURL + '/dashboard/exams')
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.addNewExam = function (name, description, type, repo, duration, classname, userid) {
        return this.http.post(this.currentURL + '/dashboard/exams', { exam_name: name, exam_desc: description, exam_type: type, exam_duration: duration, exam_repo: repo, exam_creator_id: userid, class_name: classname }, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.setExamStatus = function (id, status) {
        return this.http.put(this.currentURL + '/dashboard/exams', { exam_id: id, exam_status: status }, { headers: this.headers })
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