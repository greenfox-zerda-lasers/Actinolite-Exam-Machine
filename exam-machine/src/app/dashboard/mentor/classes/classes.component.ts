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

  addNewClass(newClassName: HTMLInputElement, newCohortName:string) {
    if (newClassName.value.length > 0) {
      var newClass = {name: newClassName.value, cohort: newCohortName};
      this.classes.push(newClass);
    }
    newClassName.value = '';
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
      .then((data) => this.classes = data);
  }


  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.renderClasses();
  }

}
