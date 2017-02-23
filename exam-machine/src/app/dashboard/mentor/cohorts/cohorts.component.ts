import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AlertService } from '../../../services/alert.service';
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
    DataService,
    AlertService
  ]
})

export class CohortsComponent implements OnInit {

  cohorts;
  cohortIdToDelete;
  cohortNameToDelete;

  response;
  top; //alert show and hide

  errorAlert:boolean = false;
  successAlert:boolean = false;

  displayResponse() {
    this.renderCohorts();
    if (this.response.status === 'success') {
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
    } else if (this.response.status === 'fail') {
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    } else {
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
    }
  };

  addNewCohort(newCohort: HTMLInputElement) {
    if (newCohort.value.length > 0) {
        var newcohort = newCohort.value;
        this.dataService.addNewCohort(newcohort)
          .toPromise()
          .then((data) => this.response = data)
          .then(() => newCohort.value = '')
          .then(() => this.displayResponse());
    }
  };

  renderCohorts() {
    this.dataService.fetchCohorts()
      .toPromise()
      .then((data) => this.cohorts = data.cohorts);
  };

  setCohortForDelete(id, name) {
    this.cohortIdToDelete = id;
    this.cohortNameToDelete = name;
  };

  setCohortNameInInput(element: HTMLInputElement, name) {
    element.value = name;
  };

  editCohort(input: HTMLInputElement) {
    this.dataService.editCohort(input.value, this.cohortIdToDelete)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse());
  };

  deleteCohort() {
    this.dataService.deleteCohort(this.cohortIdToDelete)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse());
  };

  constructor(
    private dataService: DataService,
    private alert: AlertService ) { }

  ngOnInit() {
    this.renderCohorts();
  }

}
