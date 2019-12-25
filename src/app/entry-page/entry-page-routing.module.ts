import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from './entry-page/entry-page.component'

const routes: Routes = [
  {
    path: '',
    component: EntryPageComponent,
    // pathMatch: 'exact',
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('./../contacts/contacts.module').then(m => m.ContactsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/auth/login'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryPageRoutingModule { }
