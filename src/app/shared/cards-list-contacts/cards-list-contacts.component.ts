import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-cards-list-contacts',
  templateUrl: './cards-list-contacts.component.html',
  styleUrls: ['./cards-list-contacts.component.scss']
})
export class CardsListContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private contactsService: StoreService) {
    this.contacts$ = contactsService.contacts$
  }


  ngOnInit() {
  }

}
