import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examstart',
  templateUrl: './examstart.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../../mentor/mentor.component.css',
    './examstart.component.css'
  ]
})
export class ExamstartComponent implements OnInit {

  student_repo;

  exams = [];
  // exams = [
  //   {
  //     exam_id: '1',
  //     exam_name: 'Python exam',
  //     exam_description: 'Fork this repository under your own account. Clone the forked repository to your computer. Commit your progress frequently and with descriptive commit messages. All answers should go in this repository.',
  //     max_auto: '15',
  //     max_subj: '10',
  //     exam_duration: '180',
  //     master_repo: 'http://github.com/greenfox-academy/zerda-lasers/python-exam'
  //   },
  //   {
  //     exam_id: '2',
  //     exam_name: 'Javascript exam',
  //     exam_description: 'Fork this repository under your own account. Clone the forked repository to your computer. Commit your progress frequently and with descriptive commit messages. All answers should go in this repository.',
  //     max_auto: '12',
  //     max_subj: '7',
  //     exam_duration: '180',
  //     master_repo: 'http://github.com/greenfox-academy/zerda-lasers/javascript-exam'
  //   }
  // ]

  constructor() { }

  ngOnInit() {
  }

}
