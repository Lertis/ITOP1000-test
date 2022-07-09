import { Injectable, Injector } from '@angular/core'

import { IBaseServiceConfig, BankName, BanksMap } from '../../model'

@Injectable()
export class BankFacadeService {
  constructor (private readonly injector: Injector) { }

  getBankInstance (bankId: BankName): IBaseServiceConfig {
    return this.injector.get<IBaseServiceConfig>(BanksMap.get(bankId))
  }

}
