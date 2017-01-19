import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  users = [];

  constructor(private http: Http) { }

  fetchData(email, password) {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('https://exam-machine-backend.gomix.me', {email: email, password: password}).map(
      (res) => res.json()
    );
  }

  // fetchData() {
  //   return this.http.get('https://exam-machine.firebaseio.com/.json').map(
  //     (res) => res.json()
  //   );
  // }

  // updateData() {
  //   firebase.database().ref('/').on('child_added'),
  //   (snapshot) => {
  //     this.users.push(snapshot.val())
  //   }
  // } // this refreshes user list when new user is added to the database

  // postData(name, email, pass, hint) {
  //   firebase.database().ref('/').push({name: name, email: email, password: pass, hint: hint, permission: '0'})
  // }

//   createUser(name, email, pass, hint) {
//     firebase.database().ref('/').set({
//       var newUser = {
//         name: name,
//         email: email,
//         password: pass,
//         hint: hint,
//         permission: '0'
//       }
//     })
//   }
//
// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

}
