import { Injectable } from '@angular/core'
import { map, Observable, of } from 'rxjs'

import * as mock from '../mocks/mono.mock'
import * as utils from '../../../utils'
import * as mdl from '../../../model'

@Injectable()
export class MockMonoBankFacadeService implements mdl.IBaseServiceConfig {
  getCurrencyExchangeRate (): Observable<mdl.ICurrencyMonoBankView[]> {
    return of(mock.MOCK_MONO)
  }

  getCurrencyExchangeRateForHeaderView (): Observable<mdl.ICurrencyHeaderView[]> {
    return this.getCurrencyExchangeRate().pipe(map(values => utils.mapMonoBankToCommonView(values)))
  }

}
