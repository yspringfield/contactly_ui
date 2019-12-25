import { Injectable } from '@angular/core';
import { StoreService } from '../services/store/store.service';
import { LoginInfo, RegisterInfo } from './interfaces';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _store_service: StoreService,
    private readonly _api_service: ApiService,
    private readonly _router: Router,
  ) { }

  authenticate = (info: LoginInfo) => {
    return this._api_service.post('/user/login', info)

      // of(info)
      .pipe(
        tap(({ user }) => {
          // console.log({ data, message })
          this._store_service.auth_info = user
          this._router.navigateByUrl('/contacts/list')
        })
        // delay(2000),
        // map(authInfo => ({
        //   username: 'John doe',
        //   role: 'administrator',
        //   avatar: 'https://picsum.photos/200',
        //   token: 'many'
        // }))
      )
    // .subscribe()
  }

  register = (info: RegisterInfo) => {
    return this._api_service.get('/user')
      .pipe(
        tap(({ user }) => {
          this._store_service.auth_info = user
          this._router.navigateByUrl('/contacts/list')
        })
      )
  }

}
