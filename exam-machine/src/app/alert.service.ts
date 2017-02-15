import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  errorAlert:boolean = false;
  successAlert:boolean = false;

  setStyleTop(that) {
    that.top = '50px';
    setTimeout(() => {
      that.top = '-50px';
    }, 3000);
  }

  setStyleHeight(that) {
    that.height = 'auto';
    setTimeout(() => {
      that.height = '0px';
    }, 3000);
  }

  displayError(that, message, func) {
    that.message = message;
    that.errorAlert = true;
    that.successAlert = false;
    func;
  }

  displaySuccess(that, message, func) {
    that.message = message;
    that.successAlert = true;
    that.errorAlert = false;
    func;
  }

  constructor() { }

}
