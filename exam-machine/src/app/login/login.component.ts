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
      .then((data) => { this.response = data, localStorage.setItem('token', data.headers.get('token') })
      .then(() => this.navigate())
      .catch(this.handleError);
  }
  navigate() {
    if (this.response.result === 'success') {
//     console.log('Token from header: ', this.response.headers.get('token'))
//     this.dataService.token = this.response.headers.get('token');
//      localStorage.setItem("userid", this.response.user_id);
      localStorage.setItem("usertype", this.response.user_type);
      localStorage.setItem("username", this.response.user_name); // server send username?
      this.setStyle();
      // console.log("login.component.ts navigate: ",this.dataService.token);
//       this.dataService.userToken(this.dataService.token).toPromise();
      this.router.navigateByUrl('/dashboard');
    } else if (this.response.result === 'fail') {
      this.setClassDanger(this.response.message);
      this.setStyle();
      console.log(this.response.message);
    } else {
      console.log('login error');
      this.setClassDanger('An unknown error occured.');
      this.setStyle();
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
