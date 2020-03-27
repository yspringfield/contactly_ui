import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StoreService, Contact } from '../services/store/store.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { HttpRequestResponse } from '../services/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly url = '/contacts';

  constructor(
    private readonly _api_service: ApiService,
    private readonly _store_service: StoreService,
  ) {
    const params: HttpParams = new HttpParams()
      .set('all', 'true')
    this._api_service.get(this.url, params)
      .pipe(take(1))
      .subscribe(({ data, ...rest }) => {
        this._store_service.contacts = data
        console.log({ data, rest })

      })
  }

  save_new_contact(contact: Contact, file?: File) {
    console.log({ contact })
    const loading = false;
    const body = new FormData()
    Object.keys(contact).forEach(key => body.append(key, contact[key]))
    if (file) body.append('image', file)
    return this._api_service.post<HttpRequestResponse<Contact>>(this.url, body)
      .pipe(tap(res => this._store_service.addContact({ loading, ...res.data })))
  }

  update_contact(contact: Partial<Contact>, file?: File) {
    const loading = false;
    const body = new FormData()
    Object.keys(contact).forEach(key => body.append(key, contact[key]))
    if (file) body.append('image', file)
    return this._api_service.put<HttpRequestResponse<Contact>>(`${this.url}/${contact.id!}`, body)
      .pipe(tap(res => this._store_service.addContact({ loading, ...res.data })))
  }

  find_by_id(id) { return this._store_service.find_by_id(id) }
}
