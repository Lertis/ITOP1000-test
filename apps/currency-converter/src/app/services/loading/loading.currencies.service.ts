import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable()
export class LoadingCurrenciesService {
  private readonly loadingSubject = new BehaviorSubject<boolean>(true)
  loading$ = this.loadingSubject.asObservable()

  setState (flag: boolean): void {
    this.loadingSubject.next(flag)
  }

}
