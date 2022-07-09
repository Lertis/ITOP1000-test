import { Inject, Injectable } from '@angular/core'
import { catchError, map, Observable } from 'rxjs'

import { MockMonoBankFacadeService } from './mono-bank-mock'

import * as utils from '../../../utils'
import * as tokens from '../../../tokens'
import * as mdl from '../../../model'

@Injectable()
export class MonoBankFacadeService implements mdl.IBaseServiceConfig {
  constructor (
    @Inject(tokens.API_SERVICE) private readonly api: mdl.IApiService,
    @Inject(tokens.MB_CURRENCY_URL) private readonly url: string,
    private readonly mockService: MockMonoBankFacadeService) { }

  getCurrencyExchangeRate (): Observable<mdl.ICurrencyMonoBankView[]> {
    return this.api.getRequest<Array<mdl.ICurrencyMonoBankView>>(this.url).pipe(
      catchError(() => this.mockService.getCurrencyExchangeRate())
    )
  }

  getCurrencyExchangeRateForHeaderView (): Observable<mdl.ICurrencyHeaderView[]> {
    return this.getCurrencyExchangeRate().pipe(map(values => utils.mapMonoBankToCommonView(values)))
  }

}
