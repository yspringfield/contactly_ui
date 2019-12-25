import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search_filter'
})
export class SearchFilterPipe implements PipeTransform {

  changeCase = text => text.toLowerCase()

  transform(value: any, query:string, ...args: any[]): any {
    if(query==='')return value
    return [...value].filter(
      c => `${this.changeCase(c.name)} ${this.changeCase(c.description)}`.indexOf(this.changeCase(query)) !== -1
      )
  }

}
