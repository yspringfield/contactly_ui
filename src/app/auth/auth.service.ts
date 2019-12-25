import { Injectable } from '@angular/core';
import { StoreService } from '../services/store/store.service';
import { LoginInfo, RegisterInfo } from './interfaces';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _store_service: StoreService, private readonly _router: Router) { }

  authenticate = (info: LoginInfo) => {
    of(info)
      .pipe(
        delay(2000),
        map(authInfo => ({
          username: 'John doe',
          role: 'administrator',
          avatar: 'https://picsum.photos/200',
          token: 'many'
        }))
      )
      .subscribe(auth_info => {
        this._store_service.auth_info = auth_info
        this._router.navigateByUrl('/contacts/list')
      })
  }

  register = (info: RegisterInfo) => {
    of(info)
      .pipe(
        delay(2000),
        map(authInfo => ({
          username: 'John doe',
          role: 'administrator',
          avatar: 'https://picsum.photos/200',
          token: 'many'
        }))
      )
      .subscribe(auth_info => {
        this._store_service.auth_info = auth_info
        this._router.navigateByUrl('/contacts/list')
      })
  }
  
}
