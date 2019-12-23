import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy, AfterViewInit {

  @Input('title')
  title;
  isMobile = false
  MatSidenavContainer
  subscriptions: Subscription;

  constructor(private readonly breakpointObserver$: BreakpointObserver, private readonly _storeService: StoreService) { }



  ngAfterViewInit() {
    this.subscriptions = this.breakpointObserver$
      .observe(['(max-width: 580px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true
        } else {
          this.isMobile = false
        }
      });

  }

  closeSidenav = () => {
    this._storeService.sidenav_toggle_action(true)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
