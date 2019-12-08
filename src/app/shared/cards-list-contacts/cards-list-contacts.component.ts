import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, ContactsService } from 'src/app/services/contacts/contacts.service';

@Component({
  selector: 'app-cards-list-contacts',
  templateUrl: './cards-list-contacts.component.html',
  styleUrls: ['./cards-list-contacts.component.scss']
})
export class CardsListContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private contactsService: ContactsService) {
    this.contacts$ = contactsService.contacts$
  }


  ngOnInit() {
  }

}
