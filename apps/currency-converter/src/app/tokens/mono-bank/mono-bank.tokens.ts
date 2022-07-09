import { InjectionToken } from '@angular/core'

export const MONO_BANK_CURRENCY_URL = 'https://api.monobank.ua/bank/currency'
export const MB_CURRENCY_URL = new InjectionToken<string>('MB_CURRENCY_URL')
