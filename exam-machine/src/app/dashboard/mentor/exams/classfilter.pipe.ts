import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name:'FilterPipe'
})
export class FilterPipe {
  transform(value, args) {
    let cohort = args;
    return value.filter((item)=> {
      return item.cohort_id === cohort;
    });
  }
}
