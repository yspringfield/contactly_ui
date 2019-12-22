import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService, Contact } from 'src/app/services/store/store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnDestroy {

  contact$: Observable<Contact>;

  constructor(
    private readonly _router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly _storeService: StoreService,
    private readonly sidenav: MatSidenav,
  ) {
    this.contact$ = this.activatedRoute.paramMap.pipe(
      map(param => {
        let id = param.get('id')
        let contact = this._storeService.find_by_id(id)
        this.sidenav.open()
        return contact
      })
    )
  }

  ngOnDestroy() {
    this.sidenav.close()
  }
}