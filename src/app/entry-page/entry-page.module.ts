import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryPageRoutingModule } from './entry-page-routing.module';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [EntryPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    EntryPageRoutingModule,
    DashboardModule,
  ]
})
export class EntryPageModule { }
