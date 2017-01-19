import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    DataService
  ]
})

export class LoginComponent implements OnInit {

  // user = [];

  checkUser(loginUser: string, loginPass: string) {
    var user;
    this.dataService.fetchData(loginUser, loginPass)
      .toPromise()
      .then((data) => user = data)
      .then(() => this.navigate())
        // function() {
        // console.log(user)
        // if (user.status === 'ok') {
        //   console.log('login success');
        //   this.router.navigateByUrl('/dashboard');
        // } else {
        //   console.log('login error');
        // }
      // })
      .catch(this.handleError);
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // checkUser(loginUser: string, loginPass: string) {
  //   let temp = this.users.slice(1);
  //   console.log(temp);
  //   // console.log(this.users);
  //   let result = false;
  //   let user;
  //   temp.forEach(function(e) {
  //     // console.log(e);
  //     if (e.email === loginUser) {
  //       if (e.password === loginPass) {
  //         result = true;
  //         user = e;
  //       }
  //     }
  //   })
  //   if (result) {
  //     console.log('login success');
  //     this.router.navigateByUrl('/dashboard');
  //   } else {
  //     console.log('login error')
  //   }
  // }

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    // this.dataService.fetchData().subscribe(
    //   (data) => this.users = data
    // );
  }
}
