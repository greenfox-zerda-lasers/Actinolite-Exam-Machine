import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()

export class LoginService {

  private loggedIn: boolean = false;

  private headers = new Headers({'Content-Type': 'application/json'});

  currentURL = 'https://exam-machine-backend.gomix.me'; // rewrite in data service too!
  response;

  login(email, password) {
    return this.http.post(this.currentURL + '/login', {user_email: email, user_password: password}, {headers: this.headers})
      .toPromise()
      .then((res) => {
        localStorage.setItem('token', res.headers.get('token')),
        this.response = res.json()
      })
      .then(() => {
        if (this.response.status === "success") {
          this.loggedIn = true;
        }
      })
  };

  logout() {
    localStorage.clear();
    this.loggedIn = false;
  };

  isLoggedIn() {
    return this.loggedIn;
  };

  constructor(
    private http: Http) {
    this.loggedIn = !!localStorage.getItem('token');
  }

}
