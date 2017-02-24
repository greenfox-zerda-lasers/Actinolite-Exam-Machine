import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    AlertService,
    LoginService
  ]
})

export class SignupComponent implements OnInit {

  errorAlert:boolean = false;
  successAlert:boolean = false;

  height;
  response;

  sendUserData(newName: string, newEmail: string, newPass: string) {
    if (this.nonEmpty(newName) && this.nonEmpty(newEmail) && this.nonEmpty(newPass)) {
      this.loginService.signup(newName, newEmail, newPass)
        .then(() => this.navigate())
    } else {
      this.alert.displayError(this, 'Input fields can not be empty.', this.alert.setStyleHeight(this));
    }
  };

  nonEmpty(str) {
    if (str) {
      return true
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
      this.alert.displaySuccess(this, 'Passwords match!', this.alert.setStyleHeight(this));
    }
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(
    private router: Router,
    private alert: AlertService,
    private loginService: LoginService) { }

  ngOnInit() {

  }

}
