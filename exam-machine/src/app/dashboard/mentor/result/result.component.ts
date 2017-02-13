import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { AlertService } from '../../../alert.service';
import { ExamsComponent } from './../exams/exams.component';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './result.component.css'
  ],
  providers: [
    DataService,
    AlertService,
    ExamsComponent
  ]
})

export class ResultComponent implements OnInit {

  results = [];
  name = 'Exam';
  current_id;

  renderResults() {
    this.dataService.getResultsById(this.current_id)
      .toPromise()
      .then((data) => this.results = data.results)
      .then(() => console.log(this.results))
  };

  constructor(private dataService:DataService, private alert:AlertService, private exams:ExamsComponent) { }

  ngOnInit() {
    this.current_id = localStorage.getItem('examid');
    console.log(this.current_id);
    this.renderResults();
    // this.name = this.results[0].exam_name;
  }

}
