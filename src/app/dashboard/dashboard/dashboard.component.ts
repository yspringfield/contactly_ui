import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pieData = [
    {
      value: 20,
      label: 'helloworld',
    },
    {
      value: 40,
      label: 'Holla mundo',
    },
    {
      value: 50,
      label: 'Hoi Vos',
    },
    {
      value: 30,
      label: 'Grusse Welt',
    },
  ]

  line_graph_data = [
    {
      y: 20,
      x: 'Jan',
    },
    {
      y: 40,
      x: 'Feb',
    },
    {
      y: 50,
      x: 'Mar',
    },
    {
      y: 30,
      x: 'Apr',
    },
    {
      y: 20,
      x: 'May',
    },
    {
      y: 40,
      x: 'Jun',
    },
    {
      y: 50,
      x: 'Jul',
    },
    {
      y: 30,
      x: 'Aug',
    },
    {
      y: 40,
      x: 'Sep',
    },
    {
      y: 50,
      x: 'Oct',
    },
    {
      y: 30,
      x: 'Nov',
    },
    {
      y: 40,
      x: 'Dec',
    },
  ]

  sunburst_data$: any;
  force_graph$: any;

  constructor(private readonly _store_service:StoreService) { 
    this.sunburst_data$=_store_service.sunbust_data$ 
    this.force_graph$ = _store_service.force_graph$
  }

  ngOnInit() {
  }
}
