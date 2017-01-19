import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  // constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  //   newUser(newName: string, newEmail: string, newPass: string, newHint: string) {
  //     this.dataservice.postData(newName, newEmail, newPass, newHint)
  //   }
  }

}
