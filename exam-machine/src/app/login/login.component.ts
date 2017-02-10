import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthGuardService } from '../auth-guard.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    DataService,
    AuthGuardService
  ]
})

export class LoginComponent implements OnInit {

  loadingSpinner = '';
  message: '';
  dangerAlert:boolean = false;
  successAlert:boolean = false;

  response;
  height;

  verifyUser(loginUser: string, loginPass: string) {
    this.dataService.userLogin(loginUser, loginPass)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.navigate())
      .catch(this.handleError);
  }

  navigate() {
    if (this.response.result === 'success') {
      localStorage.setItem("userid", this.response.user_id);
      localStorage.setItem("usertype", this.response.user_type);
      localStorage.setItem("username", this.response.user_name);
      this.setStyle();
      this.setSpinner();
      this.setClassSuccess(this.response.message);
      console.log('login success');
      this.authService.login();
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard/' + this.response.user_type);
      }, 1000);
    } else if (this.response.result === 'fail') {
      this.setStyle();
      this.setSpinner();
      this.setClassDanger(this.response.message);
      console.log(this.response.message);
    } else {
      console.log('login error');
      this.setStyle();
      this.setSpinner();
      this.setClassDanger('An unknown error occured.');
    }
  }

  setSpinnerWithEnter() {
    this.loadingSpinner = 'spinner spinner-sm';
  }

  setSpinner() {
    this.loadingSpinner = '';
  }

  setStyle() {
    this.height = 'auto';
  }

  setClassDanger(message) {
    this.message = message;
    this.dangerAlert = true;
    this.successAlert = false;
  }

  setClassSuccess(message) {
    this.message = message;
    this.successAlert = true;
    this.dangerAlert = false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private dataService: DataService, private router: Router, private authService: AuthGuardService) { }

  ngOnInit() {
  }
}
