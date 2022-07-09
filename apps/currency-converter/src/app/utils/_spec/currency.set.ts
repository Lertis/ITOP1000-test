import * as mdl from '../../model'

export const GET_CURRENCY_NAME_SET: { input: number, result: string }[] = [
  {
    input: mdl.USD_CODE,
    result: mdl.USD_NAME
  },
  {
    input: mdl.EUR_CODE,
    result: mdl.EUR_NAME
  },
  {
    input: mdl.UAH_CODE,
    result: mdl.UAH_NAME
  },
  {
    input: 0,
    result: undefined
  }
]

export const GET_UKR_CURRENCY_NAME_SET: { input: number, result: boolean }[] = [
  {
    input: mdl.USD_CODE,
    result: false
  },
  {
    input: mdl.EUR_CODE,
    result: false
  },
  {
    input: mdl.UAH_CODE,
    result: true
  },
  {
    input: 0,
    result: false
  }
]

export const MAP_MONOBANK_TO_COMMON_VIEW_SET: { input: mdl.ICurrencyMonoBankView[], result: mdl.ICurrencyHeaderView[] }[] = [
  {
    input: [
      { currencyCodeA: mdl.EUR_CODE, currencyCodeB: mdl.UAH_CODE, 'date': 1657228208, 'rateBuy': 34.8, 'rateSell': 37.9 },
      { currencyCodeA: mdl.USD_CODE, currencyCodeB: mdl.UAH_CODE, 'date': 1657228208, 'rateBuy': 31.8, 'rateSell': 34.9 },
      { currencyCodeA: 111111, currencyCodeB: mdl.UAH_CODE, 'date': 1657228208, 'rateBuy': 100, 'rateSell': 100 },
      { currencyCodeA: mdl.USD_CODE, currencyCodeB: 11111, 'date': 1657228208, 'rateBuy': 100, 'rateSell': 100 },
    ],
    result: [
      {
        currencyName: mdl.EUR_NAME,
        purchaseRate: 37.9,
        saleRate: 34.8
      },
      {
        currencyName: mdl.USD_NAME,
        purchaseRate: 34.9,
        saleRate: 31.8
      }
    ]
  },
  {
    input: [
      { currencyCodeA: 111111, currencyCodeB: mdl.UAH_CODE, 'date': 1657228208, 'rateBuy': 100, 'rateSell': 100 },
      { currencyCodeA: mdl.USD_CODE, currencyCodeB: 11111, 'date': 1657228208, 'rateBuy': 100, 'rateSell': 100 },
    ],
    result: []
  },
  {
    input: [],
    result: []
  }
]

export const MAP_PRIVATBANK_TO_COMMON_VIEW_SET: { input: mdl.ICurrencyPrivatBankView[], result: mdl.ICurrencyHeaderView[] }[] = [
  {
    input: [
      { ccy: 'USD', base_ccy: 'UAH', buy: '35.50000', sale: '35.90000' },
      { ccy: 'EUR', base_ccy: 'UAH', buy: '35.70000', sale: '37.20000' },
      { ccy: 'BTC', base_ccy: 'USD', buy: '20383.2537', sale: '22528.8593' }
    ],
    result: [
      {
        currencyName: mdl.USD_NAME,
        purchaseRate: 35.90000,
        saleRate: 35.50000
      },
      {
        currencyName: mdl.EUR_NAME,
        purchaseRate: 37.20000,
        saleRate: 35.70000
      }
    ]
  },
  {
    input: [
      { ccy: 'EUR', base_ccy: 'UAH', buy: '35.70000', sale: '37.20000' },
      { ccy: 'BTC', base_ccy: 'USD', buy: '20383.2537', sale: '22528.8593' }
    ],
    result: [
      {
        currencyName: mdl.EUR_NAME,
        purchaseRate: 37.20000,
        saleRate: 35.70000
      }
    ]
  },
  {
    input: [],
    result: []
  }
]

