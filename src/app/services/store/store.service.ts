import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, } from 'rxjs';
import { take, tap } from 'rxjs/operators';

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
  _contacts: Contact[] = new Array(5).fill(
    {
      name: "Peter Thiel",
      registrationTime: new Date(),
      loading: false,
      is_favorite: false,
      profile_photo: 'https://picsum.photos/200',
      description: 'In this post, we will learn how the default Angular styling mechanism (Emulated Encapsulation) works under the hood, and we will also cover the Sass support of the Angular CLI, and some best practices for how to leverage the many Sass features available.',
    }
  ).map((i, idx) => ({ ...i, id: idx + 1 }))

  login_data: LoginData;

  private _contacts$ = new BehaviorSubject<Contact[]>(this._contacts)
  //@ts-ignore
  private _contacts_to_edit$ = new BehaviorSubject<Contact>({})

  setLoading$ = (id: string) => {
    const oldContacts = this._contacts$.value
    this._contacts$.next(oldContacts.map(c => c.id !== id ? c : { ...c, loading: true }))
    return timer(2000)

  }

  deleteContact = (id: string) => {
    return this.setLoading$(id).pipe(
      tap({
        complete: () => {
          const oldContacts = this._contacts$.value
          this._contacts$.next(oldContacts.filter(c => c.id !== id))
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
          }
        })
      )
  }

  toggleFavorite = (id: string) => {
    return this.setLoading$(id).pipe(
      tap({
        complete: () => {
          const oldContacts = this._contacts$.value
          console.log({ oldContacts })
          this._contacts$.next(oldContacts.map(c => {
            c.loading = false
            if (c.id !== id) return c
            return { ...c, is_favorite: !c.is_favorite }
          }))
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
          }
        })
      )
  }

  markForEdit = (contact: Contact) => {
    this._contacts_to_edit$.next(contact)
  }

  login = (login_data: LoginData) => timer(2000).pipe(
    tap({
      complete: () => this.login_data = login_data
    })
  )
  
  constructor() { }

  get contacts$() { return this._contacts$.asObservable() }
  get contacts_to_edit$() { return this._contacts_to_edit$.asObservable() }

}
