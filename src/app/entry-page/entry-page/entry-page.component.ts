import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { StoreService } from 'src/app/services/store/store.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sidenav', { static: false })
  sidenav: MatSidenav

  subscriptions: Subscription;

  constructor(private readonly breakpointObserver$: BreakpointObserver, private readonly _storeService: StoreService) { }

  ngAfterViewInit() {
    this._storeService.toggleSidenav
      .pipe(
        skip(1)
      )
      .subscribe((isOpened) => this.sidenav.toggle())
    this.subscriptions = this.breakpointObserver$
      .observe(['(max-width: 580px)'])
      // .pipe(skip(1))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidenav.mode = 'over'
          // this.sidenav.open()
        } else {
          this.sidenav.mode = 'side'
          this.sidenav.open()
        }
      });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }


}
