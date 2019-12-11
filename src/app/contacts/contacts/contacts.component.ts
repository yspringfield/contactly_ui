import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  hide = true;

  @ViewChild('list_toggle', { static: false })
  list_toggle;

  constructor() {
  }


  ngOnInit() {
  }


}
