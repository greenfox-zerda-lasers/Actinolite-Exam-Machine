import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';
import { LoginService } from '../login.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    DataService,
    AlertService,
    LoginService
  ]
})

export class SignupComponent implements OnInit {

  dangerAlert:boolean = false;
  successAlert:boolean = false;

  height;
  response;

  sendUserData(newName: string, newEmail: string, newPass: string) {
    if (this.nonEmpty(newName) && this.nonEmpty(newEmail) && this.nonEmpty(newPass)) {
      this.dataService.userSignup(newName, newEmail, newPass)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.evaluate(newEmail, newPass))
      .catch(this.handleError)
    } else {
      this.alert.displayError(this, 'Input fields can not be empty.', this.alert.setStyleHeight(this));
    }
  };

  nonEmpty(str) {
    if (str) {
      return true
    }
  };

  evaluate(newEmail, newPass) {
    if (this.response.status === 'success') {
      console.log('signup success');
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleHeight(this));
      this.loginService.login(newEmail, newPass)
        .then(() => this.navigate())
    }
    else if (this.response.status === 'Fail') {
      console.log(this.response.message);
      this.alert.displayError(this, this.response.message, this.alert.setStyleHeight(this));
    }
    else {
      console.log('signup error');
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleHeight(this));
    }
  };

  navigate() {
    if (this.loginService.response.status === 'success') {
      console.log('login success')
      if (this.loginService.response.user_admin === "t") {
        localStorage.setItem('usertype', 'mentor');
      }
      else {
        localStorage.setItem('usertype', 'student');
      };
      localStorage.setItem("username", this.loginService.response.user_name);
      this.alert.displaySuccess(this, this.loginService.response.message, this.alert.setStyleHeight(this));
      this.router.navigateByUrl('/dashboard');
    }
    else if (this.loginService.response.status === 'fail') {
      this.alert.displayError(this, this.loginService.response.message, this.alert.setStyleHeight(this));
      console.log(this.loginService.response.message);
    }
    else {
      this.alert.displayError(this, 'An unknown error occured', this.alert.setStyleHeight(this));
      console.log('login error');
    }
  };

  checkPass(newPass: string, rePass: string) {
    if (newPass != rePass) {
      this.alert.displayError(this, 'Passwords don\'t match!', this.alert.setStyleHeight(this));
    } else {
      this.alert.displayError(this, 'Passwords match!', this.alert.setStyleHeight(this));
    }
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private alert: AlertService,
    private loginService: LoginService) { }

  ngOnInit() {

  }

}
