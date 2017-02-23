import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AlertService } from '../../../services/alert.service';
import { CalculateService } from '../../../services/calculate.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-pastexams',
  templateUrl: './pastexams.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../../mentor/mentor.component.css',
    './pastexams.component.css'
  ],
  providers: [
    DataService,
    AlertService,
    CalculateService
  ]
})

export class PastexamsComponent implements OnInit {

  previous = <any>[];

  renderPrevious() {
    this.dataService.getPreviousById(localStorage.getItem('userid'))
      .toPromise()
      .then((data) => this.previous = data.result)
      .then(() => this.calculate.addPercents(this.previous))
      .catch(this.handleError)
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  constructor(
    private dataService: DataService,
    private alert: AlertService,
    private calculate:CalculateService) {
  }

  ngOnInit() {
    this.renderPrevious()
  }

}
