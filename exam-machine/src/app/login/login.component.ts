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
    console.log('Token from header: ', this.response.headers.get('token'))
    // console.log('Response status: ', this.response.json())
    this.dataService.token = this.response.headers.get('token');
    // this.response.map((res) => res.json());
    if (this.response.json().result === 'success') {
      this.setClassSuccess(this.response.json().message);
      this.setStyle();
      // console.log("login.component.ts navigate: ",this.dataService.token);
      console.log("reapon: ",this.response.json().token);

      this.dataService.userToken(this.dataService.token).toPromise();
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
