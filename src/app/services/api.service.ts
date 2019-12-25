import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  headers: HttpHeaders;
  constructor(
    private _http: HttpClient,
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage['token']|| ''}`
    })
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this._http.get<T>(`${environment.api_url}${path}`, { params, headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }

  get_simple<T>(path: string, ): Observable<T> {
    return this._http.get<T>(`${path}`)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this._http.put(
      `${environment.api_url}${path}`, JSON.stringify(body), { headers: this.headers }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this._http.post(
      `${environment.api_url}${path}`, JSON.stringify(body), { headers: this.headers }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this._http.delete(
      `${environment.api_url}${path}`, {headers:this.headers}
    ).pipe(catchError(this.formatErrors));
  }
}
