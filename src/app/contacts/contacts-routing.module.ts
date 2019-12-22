import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsListingComponent } from './contacts-listing/contacts-listing.component';
import { FormNewContactComponent } from './form-new-contact/form-new-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: 'list',
    component: ContactsListingComponent,
    children: [{
      path: ':id',
      component: ContactDetailsComponent,
    }]
  },
  {
    path: 'new',
    component: FormNewContactComponent
  },
  {
    path: 'update/:id',
    component: FormNewContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
