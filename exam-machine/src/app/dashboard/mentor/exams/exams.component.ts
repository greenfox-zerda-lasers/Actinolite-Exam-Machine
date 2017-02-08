import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../mentor.component.css',
    './exams.component.css'
  ]
})

export class ExamsComponent implements OnInit {

  exams_length;
  exams;

  renderExams() {
    this.dataService.fetchExams()
    .toPromise()
    .then((data) => this.exams = data.exams)
    // .then(() => console.log(this.exams))
    .then(() => this.exams_length = this.exams.length)
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.renderExams();
  }
}
