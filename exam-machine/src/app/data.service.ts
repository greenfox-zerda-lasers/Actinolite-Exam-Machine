import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()

export class DataService {

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  userLogin(email, password) {
    return this.http.post('https://letstrysomething.gomix.me/user/login', {user_email: email, user_password: password}, {headers: this.headers})
      .map((res) => res.json());
  }

  userSignup(name, email, password) {
    return this.http.post('https://letstrysomething.gomix.me/user/signup', {user_name: name, user_email: email, user_password: password}, {headers: this.headers})
      .map((res) => res.json())
  }

  fetchClasses() {
    return this.http.get('https://letstrysomething.gomix.me/dashboard/classes')
      .map((res) => res.json())
  }

  addNewClass(name, cohortId) {
    console.log('add new class request sent');
    return this.http.post('https://letstrysomething.gomix.me/dashboard/classes', {class_name: name, cohort_id: cohortId}, {headers: this.headers})
      .map((res) => res.json())
  }

  assignClassToCohort(name, id) {
    return this.http.put('https://exam-machine-backend.gomix.me/dashboard/classes-to-cohorts', {class_name: name, cohort_id: id}, {headers: this.headers})
      .map((res) => res.json())
  }

  editClass(name, cohortId, classId) {
    return this.http.put('https://letstrysomething.gomix.me/dashboard/classes', {class_name: name, cohort_id: cohortId, class_id: classId }, {headers: this.headers})
      .map((res) => res.json())
  }

  deleteClass(id) {
    return this.http.delete('https://letstrysomething.gomix.me/dashboard/classes/' + id)
      .map((res) => res.json())
  }

  fetchCohorts() {
    return this.http.get('https://letstrysomething.gomix.me/dashboard/cohorts')
      .map((res) => res.json())
  }

  addNewCohort(name) {
    return this.http.post('https://letstrysomething.gomix.me/dashboard/cohorts', {cohort_name: name}, {headers: this.headers})
      .map((res) => res.json())
  }

  editCohort(name, cohortId) {
    return this.http.put('https://letstrysomething.gomix.me/dashboard/cohorts', {cohort_name: name, cohort_id: cohortId}, {headers: this.headers})
      .map((res) => res.json())
  }

  deleteCohort(name) {
    return this.http.delete('https://letstrysomething.gomix.me/dashboard/cohorts/' + name )
      .map((res) => res.json())
  }

  fetchStudents() {
    return this.http.get('https://exam-machine-backend.gomix.me/dashboard/students')
      .map((res) => res.json())
  }

  fetchUnassigned() {
    return this.http.get('https://exam-machine-backend.gomix.me/dashboard/unassigned')
      .map((res) => res.json())
  }

  assignStudentToClass(studentid, classid) {
    return this.http.post('https://exam-machine-backend.gomix.me/dashboard/students', {user_id: studentid, class_id: classid}, {headers: this.headers})
      .map((res) => res.json())
  }

  fetchExams() {
    return this.http.get('https://exam-machine-backend.gomix.me/dashboard/exams')
      .map((res) => res.json())
  }

  addNewExam(name, description, repo, duration, classid, userid) {
    return this.http.post('https://exam-machine-backend.gomix.me/dashboard/exams', {exam_name: name, exam_desc: description, exam_duration: duration, exam_repo: repo, exam_creator_id: userid, exam_class: classid}, {headers: this.headers})
      .map((res) => res.json())
  }

  changeExamState(state) {
    return this.http.put('https://exam-machine-backend.gomix.me/dashboard/exams', {exam_status: state}, {headers: this.headers})
      .map((res) => res.json())
  }

}
