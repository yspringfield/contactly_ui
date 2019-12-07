import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForceGraphComponent } from './force-graph/force-graph.component';


const routes: Routes = [
  {
    component: ForceGraphComponent,
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphsRoutingModule { }
