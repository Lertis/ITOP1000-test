import { Observable } from 'rxjs'
import { BankName } from '../banks/bank.identifier.model'
import { MonoBankFacadeService } from '../../services/facades/mono-bank/mono-bank.facade'
import { PrivatBankFacadeService } from '../../services/facades/privat-bank/private-bank.facade'

export const BanksNaming = {
  [BankName.MONOBANK]: 'Monobank',
  [BankName.PRIVATBANK]: 'Privat24'
}

export const BanksMap = new Map<BankName, any>([
  [BankName.MONOBANK, MonoBankFacadeService],
  [BankName.PRIVATBANK, PrivatBankFacadeService]
])

export interface IApiService {
  getRequest: <T>(url: string) => Observable<T>
  postRequest: <T, P>(url: string, payload: P) => Observable<T>
  putRequest: <T, P>(url: string, payload: P) => Observable<T>
  deleteRequest: <T>(url: string) => Observable<T>
}

export interface IBaseServiceConfig {
  getCurrencyExchangeRate (): Observable<any>
  getCurrencyExchangeRateForHeaderView(): Observable<any>
}
