import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { IApiService } from '../../model'

@Injectable({
  providedIn: 'platform'
})
export class ApiService implements IApiService {

  constructor (private readonly http: HttpClient) { }

  getRequest<T> (url: string): Observable<T> {
    return this.http.get<T>(url)
  }

  postRequest<T, P> (url: string, payload: P): Observable<T> {
    return this.http.post<T>(url, payload)
  }

  putRequest<T, P> (url: string, payload: P): Observable<T> {
    return this.http.put<T>(url, payload)
  }

  deleteRequest<T> (url: string): Observable<T> {
    return this.http.delete<T>(url)
  }

}
