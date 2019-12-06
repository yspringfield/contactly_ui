import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HorizontalListContactsComponent } from './horizontal-list-contacts/horizontal-list-contacts.component';
import { CardsListContactsComponent } from './cards-list-contacts/cards-list-contacts.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    SideNavComponent,
    ToolbarComponent,
    HorizontalListContactsComponent,
    CardsListContactsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgScrollbarModule,
  ],
  exports: [
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToolbarComponent,
    CardsListContactsComponent,
    HorizontalListContactsComponent,
    NgScrollbarModule,
  ]
})
export class SharedModule { }
