import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './cohorts.component.css'
  ]
})

export class CohortsComponent implements OnInit {

  cohorts = [
    {
      name: "Zerda"
    },
    {
      name: "Vellox"
    },
    {
      name: "Boti"
    }
  ];

  addNewCohort(newCohort: HTMLInputElement) {
    if (newCohort.value.length > 0) {
        var newcohort = {name: newCohort.value};
        this.cohorts.push(newcohort);
    }
    newCohort.value = "";
  }


  constructor() { }

  ngOnInit() {
  }

}
