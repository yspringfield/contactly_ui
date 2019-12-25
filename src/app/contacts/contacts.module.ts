import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListingComponent } from './contacts-listing/contacts-listing.component';
import { ItemContactComponent } from './item-contact/item-contact.component';
import { FormNewContactComponent } from './form-new-contact/form-new-contact.component';
import { ContactsRoutingModule } from './contacts-routing.module'
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactsListingComponent,
    ItemContactComponent,
    FormNewContactComponent,
    ContactDetailsComponent,
    SearchFilterPipe,
    StatusFilterPipe
  ],
  imports: [
    ContactsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class ContactsModule { }
