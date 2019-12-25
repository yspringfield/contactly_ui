import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/services/store/store.service';

@Pipe({
  name: 'status_filter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(value: Contact[], checked:boolean | string, ...args: any[]): any {
    console.log({checked})
    if (checked === 'all') {
      return value
    }
    else if (checked ==='true') {
      return [...value].filter(val => val.is_favorite)
    }
    else {
      return [...value].filter(val => !val.is_favorite)
    }
  }

}
