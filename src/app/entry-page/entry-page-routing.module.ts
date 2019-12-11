import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from './entry-page/entry-page.component'

const routes: Routes = [
  {
    path: '',
    component: EntryPageComponent,
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./../contacts/contacts.module').then(m => m.ContactsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryPageRoutingModule { }
