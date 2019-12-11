import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForceGraphComponent } from './force-graph/force-graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
  },
  {
    component: ForceGraphComponent,
    path: 'force_layout',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
