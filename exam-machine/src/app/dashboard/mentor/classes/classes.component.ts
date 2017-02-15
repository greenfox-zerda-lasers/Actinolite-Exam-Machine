import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-class',
  templateUrl: './classes.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './classes.component.css'
  ],
  providers: [
    DataService,
    AlertService
  ]
})

export class ClassesComponent implements OnInit {

  classes;
  classIdToDelete;
  cohorts;
  cohortId;
  classIdToEdit;
  classNameToDelete;

  response;
  top; //alert show and hide

  errorAlert:boolean = false;
  successAlert:boolean = false;

  displayResponse() {
    this.renderClasses();
    if (this.response.status === 'success') {
      this.alert.displaySuccess(this, this.response.message, this.alert.setStyleTop(this));
    } else if (this.response.status === 'fail') {
      this.alert.displayError(this, this.response.message, this.alert.setStyleTop(this));
    } else {
      this.alert.displayError(this, 'An unknown error occured.', this.alert.setStyleTop(this));
    }
  };

  addNewClass(newClass: HTMLInputElement) {
    if (newClass.value.length > 0) {
        var newclass = newClass.value;
        this.dataService.addNewClass(newclass, this.cohortId)
          .toPromise()
          .then((data) => this.response = data)
          .then(() => newClass.value = '')
          .then(() => this.displayResponse());
    }
  }

  getCohortId(name) {
    var thisCohortId;
    this.cohorts.forEach(function(item){
      if (item.cohort_name == name) {
        thisCohortId = item.cohort_id;
      }
    });
    this.cohortId = thisCohortId;
    console.log(this.cohortId);
  }

  setClassForDelete(id, name) {
    this.classIdToDelete = id;
    this.classNameToDelete = name;
  }

classNameInInput(input: HTMLInputElement, name) {
  input.value = name;
}

  setClassIdToEdit(value) {
    this.classIdToEdit = value;
  }

  editClass(name, cohort) {
    console.log(this.classIdToEdit);
    this.dataService.editClass(name, cohort, this.classIdToEdit)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse());
  }

  deleteClass() {
    this.dataService.deleteClass(this.classIdToDelete)
      .toPromise()
      .then((data) => this.response = data)
      .then(() => this.displayResponse());
  }

  renderClasses() {
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => { this.classes = data.classes, this.cohorts = data.cohorts })
      .then(() => console.log(this.classes, this.cohorts));
  }

  constructor( private dataService: DataService, private alert: AlertService ) { }

  ngOnInit() {
    this.renderClasses();
  }

}
