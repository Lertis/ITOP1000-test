import { InjectionToken } from '@angular/core'


export const PRIVAT_BANK_CURRENCY_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
export const PB_CURRENCY_URL = new InjectionToken<string>('PB_CURRENCY_URL')
