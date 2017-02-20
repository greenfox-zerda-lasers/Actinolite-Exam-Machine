import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    DataService,
    AlertService
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
      .then(() => this.navigate())
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

  navigate() {
    if (this.response.result === 'success') {
      console.log('signup success');
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleHeight(this));
      this.router.navigateByUrl('/');
    } else if (this.response.result === 'Fail') {
      console.log(this.response.message);
      this.alert.displayError(this, this.response.message, this.alert.setStyleHeight(this));
    } else {
      console.log('signup error');
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleHeight(this));
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
    private alert: AlertService) { }

  ngOnInit() {

  }

}
