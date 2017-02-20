import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  navigate() {
    if (this.router.url.includes('dashboard')) {
      this.router.navigateByUrl('/dashboard/' + localStorage.getItem('usertype'))
    }
    else {
      this.router.navigateByUrl('/')
    }
  };

  isRoot() {
    if (this.router.url.includes('dashboard')) {
      return false
    }
    else {
      return true
    }
  };

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

}
