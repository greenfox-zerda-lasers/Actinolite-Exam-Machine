import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  cohorts = [{name: "Zerda"}, {name: "Velox"}];



  classes = [
    {
      name : "Laser",
      cohort: "Zerda"
    },
    { name: "Sparta",
      cohort: "Zerda"
    },
    {
      name: "Raptor",
      cohort: "Zerda"
    },
    {
      name: "Valami",
      cohort: "Velox"
    }
];

  addNewClass(newClassName: HTMLInputElement, newCohortName:string) {
    if (newClassName.value.length > 0) {
      var newClass = {name: newClassName.value, cohort: newCohortName};
      this.classes.push(newClass);
    }
    newClassName.value = '';
  }

  constructor() { }

  ngOnInit() {
  }

}
