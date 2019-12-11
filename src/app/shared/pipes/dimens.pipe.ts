import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dimens'
})
export class DimensPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return [value.clientWidth, value.clientHeight]
  }

}
