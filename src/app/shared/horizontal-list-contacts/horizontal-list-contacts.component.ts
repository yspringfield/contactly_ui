import { Component, OnInit } from '@angular/core';
import { StoreService, Contact } from 'src/app/services/store/store.service';
import { Observable, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-horizontal-list-contacts',
  templateUrl: './horizontal-list-contacts.component.html',
  styleUrls: ['./horizontal-list-contacts.component.scss']
})
export class HorizontalListContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(
    private contactsService: StoreService,
    private _snackBar: MatSnackBar,
  ) {
    this.contacts$ = contactsService.contacts$
  }

  duration = 2000
  onSubscribe = {
    error: (e) => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: this.duration,
        data: { type: 'error', text: 'There was a error' }
      });
    },
    complete: () => {
      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: this.duration,
        data: { type: 'success', text: 'Success' }
      });
    }
  }

  deleteContact = id => {
    this.contactsService.deleteContact(id)
      .subscribe(this.onSubscribe)
  }

  toggleFavorite = id => {
    this.contactsService.toggleFavorite(id)
      .subscribe(this.onSubscribe)
  }

  markForEdit = (contact: Contact) => {
    this.contactsService.markForEdit(contact)
  }


  // viewDetails = (contact: Contact) => {
  //   this.contactsService.viewDetails(contact)
  // }

  ngOnInit() {
  }

}
