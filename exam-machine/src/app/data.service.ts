import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class DataService {
  token;
  constructor(private http: Http) { }

  userLogin(email, password) {
    return this.http.post('http://localhost:8080/authenticate', {email: email, password: password})
      .map((res) => res.json());
  }
  userToken(token) {
    return this.http.post('http://localhost:8080/token', {token: token})

  }
  userSignup(name, email, password) {
    return this.http.post('https://exam-machine-backend.gomix.me/user/signup', {name: name, email: email, password: password})
      .map((res) => res.json())
  }

}
