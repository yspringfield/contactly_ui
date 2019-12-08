import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryPageModule } from './entry-page/entry-page.module';
import {
  SideNavServiceService,
} from './shared'
import { MaterialModule } from './material.module';
import { ContactsService } from './services/contacts/contacts.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EntryPageModule,
    MaterialModule,
  ],
  providers: [
    SideNavServiceService,
    ContactsService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500, panelClass: 'snackbar'}}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
