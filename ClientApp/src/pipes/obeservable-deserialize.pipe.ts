import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obeservableDeserialize'
})
export class ObeservableDeserializePipe implements PipeTransform {

  transform(value: Observable<any>, args?: any) {

    return value.pipe(
      map(m=> JSON.parse(m))
    )
    // return null;
  }

}
