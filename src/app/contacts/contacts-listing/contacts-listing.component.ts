import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-listing',
  templateUrl: './contacts-listing.component.html',
  styleUrls: ['./contacts-listing.component.scss']
})
export class ContactsListingComponent {
  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav

  paramSubscription: Subscription;
  open_sidenav = false

  constructor(private readonly _router:Router){}

  onClose = () => {
    this._router.navigateByUrl('/contacts/list')
  }

}
