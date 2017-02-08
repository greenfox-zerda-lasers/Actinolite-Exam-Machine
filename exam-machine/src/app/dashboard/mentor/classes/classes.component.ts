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

  addNewClass(newClass: HTMLInputElement, cohortId) {
    if (newClass.value.length > 0) {
        var newclass = newClass.value;
        this.dataService.addNewClass(newclass, cohortId)
          .toPromise()
          .then(() => newClass.value = '')
          .then(() => this.renderClasses());
    }
  }

  showID(valami) {
    console.log(valami.value);
  }

  setClassForDelete(name) {
    this.classToDelete = name;
    console.log(this.classToDelete);
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
