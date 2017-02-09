/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivateService } from './activate.service';

describe('ActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateService]
    });
  });

  it('should ...', inject([ActivateService], (service: ActivateService) => {
    expect(service).toBeTruthy();
  }));
});
