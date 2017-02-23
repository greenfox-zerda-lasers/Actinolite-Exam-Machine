import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    AlertService,
    LoginService
  ]
})

export class LoginComponent implements OnInit {

  loadingSpinner = '';
  errorAlert:boolean = false;
  successAlert:boolean = false;

  height;

  verifyUser(loginUser: string, loginPass: string) {
    this.loginService.login(loginUser, loginPass)
      .then(() => this.setSpinner())
      .then(() => this.navigate())
  }; // at this point, token is already in the localStorage

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

  setSpinnerWithEnter() {
    this.loadingSpinner = 'spinner spinner-sm';
  };

  setSpinner() {
    this.loadingSpinner = '';
  };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private alert:AlertService) { }

  ngOnInit() {
  }
}
