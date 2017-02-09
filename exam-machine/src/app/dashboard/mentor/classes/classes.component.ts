import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
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
    DataService
  ]
})

export class ClassesComponent implements OnInit {

  classes;
  classToDelete;
  cohorts;
  cohortId;
  classIdToEdit;
  classNameToDelete;

  addNewClass(newClass: HTMLInputElement) {
  //  if (newClass.value.length > 0) {
        var newclass = newClass.value;
        this.dataService.addNewClass(newclass, this.cohortId)
          .toPromise()
          .then(() => newClass.value = '')
          .then(() => this.renderClasses());
  //W  }
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

  setClassForDelete(name) {
    this.classToDelete = name;
  }


  setClassNameForDelete(name) {
    this.classNameToDelete = name;
  }

classNameInInput(element: HTMLInputElement, name) {
  element.value = name;
}

  setClassIdToEdit(value) {
    this.classIdToEdit = value;
  }

  editClass(name, cohort) {
    console.log(this.classIdToEdit);
    this.dataService.editClass(name, cohort, this.classIdToEdit)
      .toPromise()
      .then(() => this.renderClasses());
  }

  deleteClass() {
    this.dataService.deleteClass(this.classToDelete)
      .toPromise()
      .then(() => this.renderClasses());
  }

  renderClasses() {
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => { this.classes = data.classes, this.cohorts = data.cohorts })
      .then(() => console.log(this.classes, this.cohorts));
  }

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.renderClasses();
  }

}
