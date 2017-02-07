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

  addNewClass(newClassName: HTMLInputElement, newCohortName:string) {
    if (newClassName.value.length > 0) {
      var newClass = {name: newClassName.value, cohort: newCohortName};
      this.classes.push(newClass);
    }
    newClassName.value = '';
  }

  removeClass(index) {
    this.classes.splice(index, 1);
  }

  renderClasses() {
    this.dataService.fetchClasses()
      .toPromise()
      .then((data) => this.classes = data);
  }


  constructor( private dataService: DataService ) { }

  ngOnInit() {
  }

}
