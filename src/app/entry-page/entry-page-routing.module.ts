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
        path: 'graphs',
        loadChildren: () => import('./../graphs/graphs.module').then(m => m.GraphsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryPageRoutingModule { }
