import { Component, OnInit } from '@angular/core';
import { SideNavServiceService } from '../services/side-nav-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  profile_url = 'https://picsum.photos/200'
  menu_item$;

  menus = [
    {
      icon: 'fas fa-calendar-times',
      link: 'something1',
      name: 'antoher thing',
    },
    {
      icon: 'fas fa-calendar-times',
      link: 'something2',
      name: 'antoher thing1',
    },
    {
      icon: 'fas fa-calendar-times',
      link: '/graphs',
      name: 'Graphs',
    },
    {
      icon: 'fas fa-calendar-times',
      link: '/contacts',
      name: 'Contacts',
    },
  ]

  constructor(sideNavService: SideNavServiceService) {
    this.menu_item$ = sideNavService.menu_items$
  }

  ngOnInit() {
  }

}
