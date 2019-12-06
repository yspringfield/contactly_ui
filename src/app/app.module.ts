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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
