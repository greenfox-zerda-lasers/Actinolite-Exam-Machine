import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()

export class DataService {

  constructor(private http: Http) { }

  currentURL = 'https://exam-machine-backend.gomix.me'; // rewrite in login service too!

  // HTTP queries

  addTokenToHeader() {
    let headers = new Headers({'Content-Type': 'application/json'});
    this.headers.append('token', localStorage.getItem('token'));
  };

  userSignup(name, email, password) {
    return this.http.post(this.currentURL + '/signup', {user_name: name, user_email: email, user_password: password}, {headers: this.headers})
      .map((res) => res.json())
  };

  getUserName(id) {
    return this.http.post(this.currentURL + '/self', {user_id: id}, {headers: this.headers})
  };

  fetchUsers() {
    return this.http.get(this.currentURL + '/users')
      .map((res) => res.json())
  };

  fetchClasses() {
    return this.http.get(this.currentURL + '/dashboard/classes')
      .map((res) => res.json())
  };

  addNewClass(name, cohortId) {
    console.log('add new class request sent');
    return this.http.post(this.currentURL + '/dashboard/classes', {class_name: name, cohort_id: cohortId}, {headers: this.headers})
      .map((res) => res.json())
  };

  assignClassToCohort(name, id) {
    return this.http.put(this.currentURL + '/dashboard/classes-to-cohorts', {class_name: name, cohort_id: id}, {headers: this.headers})
      .map((res) => res.json())
  };

  editClass(name, cohortId, classId) {
    return this.http.put(this.currentURL + '/dashboard/classes', {class_name: name, cohort_id: cohortId, class_id: classId }, {headers: this.headers})
      .map((res) => res.json())
  };

  deleteClass(id) {
    return this.http.delete(this.currentURL + '/dashboard/classes/' + id)
      .map((res) => res.json())
  };

  fetchCohorts() {
    return this.http.get(this.currentURL + '/dashboard/cohorts')
      .map((res) => res.json())
  };

  addNewCohort(name) {
    return this.http.post(this.currentURL + '/dashboard/cohorts', {cohort_name: name}, {headers: this.headers})
      .map((res) => res.json())
  };

  editCohort(name, cohortId) {
    return this.http.put(this.currentURL + '/dashboard/cohorts', {cohort_name: name, cohort_id: cohortId}, {headers: this.headers})
      .map((res) => res.json())
  };

  deleteCohort(name) {
    return this.http.delete(this.currentURL + '/dashboard/cohorts/' + name )
      .map((res) => res.json())
  };

  fetchStudents() {
    return this.http.get(this.currentURL + '/dashboard/students')
      .map((res) => res.json())
  };

  deleteStudent(userId) {
    return this.http.delete(this.currentURL + '/dashboard/students/' + userId )
      .map((res) => res.json())
  };

  fetchUnassigned() {
    return this.http.get(this.currentURL + '/dashboard/unassigned')
      .map((res) => res.json())
  };

  assignStudentToClass(studentid, classid) {
    return this.http.put(this.currentURL + '/dashboard/students', {user_id: studentid, class_id: classid}, {headers: this.headers})
      .map((res) => res.json())
  };

  fetchExams() {
    return this.http.get(this.currentURL + '/dashboard/exams')
      .map((res) => res.json())
  };

  fetchArchived() {
    return this.http.get(this.currentURL + '/dashboard/archived')
      .map((res) => res.json())
  };

  addNewExam(name, description, type, repo, duration, classname, userid) {
    return this.http.post(this.currentURL + '/dashboard/exams', {exam_name: name, exam_desc: description, exam_type: type, exam_duration: duration, exam_repo: repo, exam_creator_id: userid, class_name: classname}, {headers: this.headers})
      .map((res) => res.json())
  };

  setExamStatus(id, status) {
    return this.http.put(this.currentURL + '/dashboard/exams', {exam_id: id, exam_status: status}, {headers: this.headers})
      .map((res) => res.json())
  };

  getResultsById(id) {
    return this.http.get(this.currentURL + '/dashboard/result/' + id, {headers: this.headers})
      .map((res) => res.json())
  };

  setSubjectiveScore(examid, userid, value) {
    return this.http.put(this.currentURL + '/dashboard/result/' + examid + '/' + userid, {score: value}, {headers: this.headers})
      .map((res) => res.json())
  };

  getExamById(userid) {
    return this.http.get(this.currentURL + '/dashboard/examstart/' + userid, {headers: this.headers})
      .map((res) => res.json())
  };

  submitExam(examid, userid, repo) {
    return this.http.post(this.currentURL + '/dashboard/examstart', {exam_id: examid, user_id: userid, user_repo: repo}, {headers: this.headers})
      .map((res) => res.json())
  };

  getPreviousById(userid) { // GET request, instead of argument, send token in header
    // this.addTokenToHeader();
    return this.http.post(this.currentURL + '/dashboard/previous', {user_id: userid}, {headers: this.headers})
      .map((res) => res.json())
  };

}
