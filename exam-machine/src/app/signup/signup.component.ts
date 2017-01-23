import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    DataService
  ]
})

export class SignupComponent implements OnInit {

  response;

  sendUserData(newName: string, newEmail: string, newPass: string) {
    this.dataService.userSignup(newName, newEmail, newPass)
      .toPromise()
      .then((data) => this.response = data)
      .then() // do something here
      .then(() => this.navigate())
      .catch(this.handleError)
  }

  // validateString(str) {
  //   let result = true;
  //   let allowed = "^[a-zA-Z0-9_]+$"
  //   str.forEach(function(letter){
  //     allowed.indexOf(letter)
  //   })
  // }

  navigate() {
    if (this.response.result === 'success') {
      console.log('signup success');
      this.router.navigateByUrl('/');
    } else if (this.response.result === 'fail') {
      console.log(this.response.message);
    } else {
      console.log('signup error');
    }
  }

  // checkPass(newPass: string, rePass: string) {
  //   if (newPass != rePass) {
  //     console.log('Passwords don\'t match!');
  //   }
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // constructor() { }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

  }

}
