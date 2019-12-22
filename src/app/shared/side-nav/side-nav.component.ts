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
      icon: 'graphic_eq',
      link: '/dashboard',
      name: 'Dashboard',
      pathMatch: 'exact',
    },
    {
      icon: 'add',
      link: '/contacts/new',
      name: 'New Contact',
      pathMatch: 'exact',
    },
    {
      icon: 'list',
      link: '/contacts/list',
      name: 'List contacts',
      pathMatch: 'exact',
    },
  ]

  constructor(sideNavService: SideNavServiceService) {
    this.menu_item$ = sideNavService.menu_items$
  }

  ngOnInit() {
  }

}
