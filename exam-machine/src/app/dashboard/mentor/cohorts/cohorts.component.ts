import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './cohorts.component.css'
  ],
  providers: [
    DataService
  ]
})

export class CohortsComponent implements OnInit {

  cohorts;
  cohortToDelete;

  addNewCohort(newCohort: HTMLInputElement) {
    if (newCohort.value.length > 0) {
        var newcohort = newCohort.value;
        this.dataService.addNewCohort(newcohort)
          .toPromise()
          .then(() => newCohort.value = '')
          .then(() => this.renderCohorts());
    }
  }

  renderCohorts() {
    this.dataService.fetchCohorts()
      .toPromise()
      .then((data) => this.cohorts = data.cohorts)
      .then(() => console.log(this.cohorts));
  }

  setCohortForDelete(name) {
    this.cohortToDelete = name;
  }

  editCohort(alma: HTMLInputElement) {
    this.dataService.editCohort(alma.value, this.cohortToDelete)
      .toPromise()
      .then(() => this.renderCohorts());
  }

  deleteCohort() {
    this.dataService.deleteCohort(this.cohortToDelete)
      .toPromise()
      .then(() => this.renderCohorts());
  }

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.renderCohorts();
  }

}
