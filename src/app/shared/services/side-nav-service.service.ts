import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';


interface MenuItem {
  icon: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SideNavServiceService {
  _menu_items$ = from<MenuItem[]>([
    {
      icon: 'fas fa-calendar-times',
      name: 'antoher thing',
    },
    {
      icon: 'fas fa-calendar-times',
      name: 'antoher thing1',
    },
    {
      icon: 'fas fa-calendar-times',
      name: 'antoher thing2',
    },
    {
      icon: 'fas fa-calendar-times',
      name: 'antoher thing3',
    },
  ])

  constructor() { }

  get menu_items$(): Observable<MenuItem> {
    return this._menu_items$;
  }

}
