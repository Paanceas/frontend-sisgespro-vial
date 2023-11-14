import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value === undefined || value === null) {
      return value;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
