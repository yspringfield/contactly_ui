import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable, } from 'rxjs';
import { take, tap, filter, map, delay } from 'rxjs/operators';
import { nodesAndLinks } from './nodes'
import { FootPrint } from '../interfaces';

export interface Contact {
  name: string;
  time: Date;
  profile_photo: string;
  is_favorite: boolean;
  id: string;
  loading: boolean;
  description: string;
}

export interface LoginData {
  username: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  _dimens = [0, 0]
  _contacts: Contact[] = [
    {
      name: "Andrew carnegie",
      registrationTime: new Date(),
      loading: false,
      id: 7329,
      is_favorite: false,
      profile_photo: 'https://picsum.photos/200/300',
      description: 'This is way too much description man',
    },
    ...new Array(15).fill(
      {
        name: "Peter Thiel",
        registrationTime: new Date(),
        loading: false,
        is_favorite: false,
        profile_photo: 'https://picsum.photos/200',
        description: 'In this post, we will learn how the default Angular styling mechanism (Emulated Encapsulation) works under the hood, and we will also cover the Sass support of the Angular CLI, and some best practices for how to leverage the many Sass features available.',
      }
    ).map((i, idx) => ({ ...i, id: idx + 1 })),

  ]

  _authInfo = {
    token: localStorage['token'] || undefined,
    username: localStorage['username'] || '',
    role: localStorage['role'] || 'user',
    avatar: localStorage['avatar'] || 'https://picsum.photos/200',
  }

  login_data: LoginData;

  private _contacts$ = new BehaviorSubject<Contact[]>(this._contacts)
  _contacts_sorted$ = this._contacts$.asObservable()

  //@ts-ignore
  private _contacts_to_edit$ = new BehaviorSubject<Contact>({})

  private _mode$ = new BehaviorSubject<string>('side')
  private toggleSidenave$ = new BehaviorSubject<boolean>(false)

  private b_sunburst_data = new BehaviorSubject<any>({ name: 'nothing', children: [] })
  private b_force_graph = new BehaviorSubject<any>(nodesAndLinks)
  private b_footprint_data = new BehaviorSubject<FootPrint[]>([])

  setLoading$ = (id: string) => {
    const oldContacts = this._contacts$.value
    this._contacts$.next(oldContacts.map(c => c.id !== id ? c : { ...c, loading: true }))
    this._contacts = this._contacts$.value
    return timer(2000)
  }

  deleteContact = (id: string) => {
    return this.setLoading$(id).pipe(
      tap({
        complete: () => {
          const oldContacts = this._contacts$.value
          this._contacts$.next(oldContacts.filter(c => c.id !== id))
          this._contacts = this._contacts$.value
        }
      })
    )
  }

  updateContact = (newContact: Contact) => {
    newContact.loading = false
    return timer(0, 2000)
      .pipe(
        take(2),
        tap({
          complete: () => {
            const oldContacts = this._contacts$.value
            this._contacts$.next(oldContacts.map(c => c.id === newContact.id ? newContact : { ...c, loading: false }))
            this._contacts = this._contacts$.value
          }
        })
      )
  }

  toggleFavorite = (id: string) => {
    return this.setLoading$(id).pipe(
      tap({
        complete: () => {
          // const oldContacts = this._contacts$.value
          this._contacts$.next(this._contacts.map(c => {
            c.loading = false
            if (c.id !== id) return c
            return { ...c, is_favorite: !c.is_favorite }
          }))
          this._contacts = this._contacts$.value
        }
      })
    )
  }

  addContact = (newContact: Contact) => {
    return timer(0, 2000)
      .pipe(
        take(2),
        tap({
          complete: () => {
            const oldContacts = this._contacts$.value
            this._contacts$.next([{ loading: false, ...newContact }, ...oldContacts])
            this._contacts = this._contacts$.value
          }
        })
      )
  }

  markForEdit = (contact: Contact) => {
    this._contacts_to_edit$.next(contact)
  }

  find_by_id = id => {
    let contact = this._contacts$.value.find(c => c.id == id)
    return contact
  }

  sortIsFavorite = (is_favorite?: boolean) => {
    if (is_favorite === undefined) return this._contacts$.next(this._contacts)
    // this._contacts = this._contacts$.value
    this._contacts$.next(
      this._contacts.filter(contact => contact.is_favorite === is_favorite)
    )
  }

  get contacts$() { return this._contacts_sorted$ }
  get contacts_to_edit$() { return this._contacts_to_edit$.asObservable() }
  get sunbust_data$() { return this.b_sunburst_data.asObservable() }
  get force_graph$() { return this.b_force_graph.asObservable() }

  set dimens(data) { this._dimens = data }
  get dimens() { return this._dimens }
  set sunbust_data(data) { this.b_sunburst_data.next(data) }
  set footprints(data: FootPrint[]) { this.b_footprint_data.next(data) }

  set mode(m: string) { this._mode$.next(m) }

  //@ts-ignore
  get mode() { return this._mode$.asObservable() }

  sidenav_toggle_action = (isOpened) => this.toggleSidenave$.next(isOpened)
  get toggleSidenav() { return this.toggleSidenave$.asObservable() }

  set auth_info(info) {
    this._authInfo = info
    localStorage['token'] = info.token
    localStorage['username'] = info.username
    localStorage['avatar'] = info.avatar
    localStorage['role'] = info.role
  }

  get auth_info() { return this._authInfo }

  get browser_categories() {
    return this.b_footprint_data.asObservable().pipe(
      map(
        footprints => footprints
          .reduce((acc, curr) => {
            acc[curr.browser] = (acc[curr.browser] || 0) + 1
            return acc
          }, {})
      )
    )
  }

  get repartition_by_platform_os_browser() {
    return this.b_footprint_data.asObservable().pipe(
      map(
        footprints => footprints.map(({ form_factor, os, browser }) => ({ form_factor, os, browser }))
      ),
      map(
        footprints => footprints
          .reduce((acc, curr) => {
            const form_factor = curr.form_factor
            delete curr.form_factor
            acc[form_factor] = [...(acc[form_factor] || []), curr]
            return acc
          }, {})
      ),
      map(
        by_platform => {
          return Object.keys(by_platform).reduce((acc, curr) => {
            const platform: any[] = by_platform[curr]
            const data = { name: curr, children: platform }
            acc.children.push(data)
            return acc
          }, { name: 'Web', children: [] })
        }
      ),
      map(for_os => {
        const { children } = for_os
        children.map(partial_platform => {
          const parsed_os_browser = partial_platform.children.reduce((acc, curr) => {
            acc[curr.os] = [...(acc[curr.os] || []), {}]
          }, {})

          return { name: for_os.name, children: [] }
        })

      })
    )
  }
}
