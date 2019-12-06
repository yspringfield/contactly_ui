import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListingComponent } from './contacts-listing/contacts-listing.component';
import { ItemContactComponent } from './item-contact/item-contact.component';
import { FormNewContactComponent } from './form-new-contact/form-new-contact.component';
import { ContactsRoutingModule } from './contacts-routing.module'
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactsListingComponent,
    ItemContactComponent,
    FormNewContactComponent
  ],
  imports: [
    ContactsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class ContactsModule { }
