import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StoreService } from '../services/store/store.service';
import { DashboardService } from './dashboard.service';
import { ApiService } from '../services/api.service';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [
    DashboardService,
    ApiService,
  ]
})
export class DashboardModule { }
