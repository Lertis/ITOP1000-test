import { Injectable } from '@angular/core'
import { map, Observable, of } from 'rxjs'

import * as mock from '../mocks/privat.mock'
import * as utils from '../../../utils'
import * as mdl from '../../../model'

@Injectable()
export class MockPrivatBankFacadeService implements mdl.IBaseServiceConfig {
  getCurrencyExchangeRate (): Observable<mdl.ICurrencyPrivatBankView[]> {
    return of(mock.MOCK_PRIVAT)
  }

  getCurrencyExchangeRateForHeaderView (): Observable<mdl.ICurrencyHeaderView[]> {
    return this.getCurrencyExchangeRate().pipe(map(values => utils.mapPrivatBankToCommonView(values)))
  }

}
