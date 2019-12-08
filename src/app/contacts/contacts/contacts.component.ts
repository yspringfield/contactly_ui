import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts/contacts.service';

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
