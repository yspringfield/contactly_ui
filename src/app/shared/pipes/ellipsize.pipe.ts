import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsize'
})
export class EllipsizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const [maxLength = 150, startIndex = 0,] = args
    if (`${value}`.length > maxLength + startIndex) return `${value}`.substring(startIndex, maxLength) + "..."
    return `${value}`
  }

}
