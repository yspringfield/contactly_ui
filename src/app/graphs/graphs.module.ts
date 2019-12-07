import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { ForceGraphComponent } from './force-graph/force-graph.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [ForceGraphComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule

  ]
})
export class GraphsModule { }
