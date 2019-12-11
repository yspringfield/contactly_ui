import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
