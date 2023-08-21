import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean, trueValue: any, falseValue: any): any {
    if (typeof value !== 'boolean') {
      return value;
    }

    return value ? trueValue : falseValue;
  }

}
