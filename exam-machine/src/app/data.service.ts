import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class DataService {

  constructor(private http: Http) { }

  fetchData(email, password) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('https://exam-machine-backend.gomix.me', {email: email, password: password})
      .map((res) => res.json()
    );
  }


}
