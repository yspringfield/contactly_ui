import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HorizontalListContactsComponent } from './horizontal-list-contacts/horizontal-list-contacts.component';
import { CardsListContactsComponent } from './cards-list-contacts/cards-list-contacts.component';
// import { NgScrollbarModule } from 'ngx-scrollbar';
import { NewContactFormComponent } from './forms/new-contact-form/new-contact-form.component';
import { MaterialModule } from '../material.module';
import { EllipsizePipe } from './pipes/ellipsize.pipe';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { PiechartComponent } from './piechart/piechart.component';
import { DimensPipe } from './pipes/dimens.pipe';
import { MapComponent } from './map/map.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { SunburstComponent } from './sunburst/sunburst.component';
import { ForceGraphComponent } from './force-graph/force-graph.component';

@NgModule({
  declarations: [
    SideNavComponent,
    ToolbarComponent,
    HorizontalListContactsComponent,
    CardsListContactsComponent,
    NewContactFormComponent,
    EllipsizePipe,
    SnackbarComponent,
    DonutChartComponent,
    PiechartComponent,
    DimensPipe,
    MapComponent,
    LineGraphComponent,
    SunburstComponent,
    ForceGraphComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // NgScrollbarModule,
    MaterialModule,
  ],
  providers: [
    DimensPipe,
  ],
  exports: [
    ForceGraphComponent,
    SideNavComponent,
    SunburstComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MapComponent,
    RouterModule,
    SnackbarComponent,
    LineGraphComponent,
    DonutChartComponent,
    PiechartComponent,
    ToolbarComponent,
    CardsListContactsComponent,
    HorizontalListContactsComponent,
    NewContactFormComponent,
    // NgScrollbarModule,
  ],
  entryComponents: [
    SnackbarComponent,
  ]
})
export class SharedModule { }
