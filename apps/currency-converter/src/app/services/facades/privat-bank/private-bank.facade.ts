import { Inject, Injectable } from '@angular/core'
import { catchError, map, Observable } from 'rxjs'

import { MockPrivatBankFacadeService } from './privat-bank-mock'

import * as utils from '../../../utils'
import * as tokens from '../../../tokens'
import * as mdl from '../../../model'

@Injectable()
export class PrivatBankFacadeService implements mdl.IBaseServiceConfig {
  constructor (
    @Inject(tokens.API_SERVICE) private readonly api: mdl.IApiService,
    @Inject(tokens.PB_CURRENCY_URL) private readonly url: string,
    private readonly mockService: MockPrivatBankFacadeService) { }

  getCurrencyExchangeRate (): Observable<mdl.ICurrencyPrivatBankView[]> {
    return this.api.getRequest<Array<mdl.ICurrencyPrivatBankView>>(this.url).pipe(
      catchError(() => this.mockService.getCurrencyExchangeRate())
    )
  }

  getCurrencyExchangeRateForHeaderView (): Observable<mdl.ICurrencyHeaderView[]> {
    return this.getCurrencyExchangeRate().pipe(map(values => utils.mapPrivatBankToCommonView(values)))
  }

}
