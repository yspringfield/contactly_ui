import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { StoreService, Contact } from 'src/app/services/store/store.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { ContactsService } from '../contacts.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contacts-listing',
  templateUrl: './contacts-listing.component.html',
  styleUrls: ['./contacts-listing.component.scss']
})
export class ContactsListingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav

  @ViewChild('favorite_filter', { static: true })
  is_favorite: MatCheckbox

  sync: Subscription[] = [];
  open_sidenav = false
  bs_contacts = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.bs_contacts.asObservable();
  b_sorted_contact = new BehaviorSubject<Contact[]>([])

  sorted_contact$ = this.b_sorted_contact.asObservable();

  query = ''
  filter = 'all'
  list_toggle = 'list'

  indeterminate = true
  checked = false

  constructor(
    private readonly _router: Router,
    private readonly _store_service: StoreService,
    private readonly _contacts_service: ContactsService,
  ) {
    const sub = _store_service.contacts$
    // .pipe(take(1))
    .subscribe(c => {
      this.bs_contacts.next(c)
      return console.log({ data: c })
    })
    this.sync.push(sub)
  }

  onClose = () => {
    this._router.navigateByUrl('/contacts/list')
  }

  ngAfterViewInit() {
    // this.open_sidenav
  }

  toggle_favorite_search = () => {
    console.log({
      checked: this.checked,
      indeterminate: this.indeterminate,
    })
    if (this.checked) {
      this.checked = false
      this.indeterminate = false;
      // this._store_service.sortIsFavorite(false)
    }
    else if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true
      // this._store_service.sortIsFavorite(true)
    }
    else {
      // this._store_service.sortIsFavorite()
      this.checked = false
      this.indeterminate = true
    }
  }

  search = () => {
    const oldContacts = this.bs_contacts.value
    let new_contacts = oldContacts.filter(c => {
      if (this.indeterminate) return true
      return c.is_favorite === this.checked
    })
    if (this.query !== '')
      new_contacts = new_contacts.filter(c => `${c.name} ${c.description}`.indexOf(this.query) !== -1)

    this.b_sorted_contact.next(new_contacts)
  }

  ngOnDestroy() {
    this.sync.forEach(sub => sub.unsubscribe())
  }
}
