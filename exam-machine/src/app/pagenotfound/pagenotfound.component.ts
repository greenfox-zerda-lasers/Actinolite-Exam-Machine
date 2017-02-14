import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  navigate() {
    this.router.navigateByUrl('/dashboard/' + localStorage.getItem('usertype'))
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
