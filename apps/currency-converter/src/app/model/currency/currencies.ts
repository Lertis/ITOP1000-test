export const UAH_CODE = 980
export const USD_CODE = 840
export const EUR_CODE = 978

export const USD_KEY = 1
export const EUR_KEY = 2
export const UAH_KEY = 3

export const USD_NAME = 'USD'
export const EUR_NAME = 'EUR'
export const UAH_NAME = 'UAH'

export const bankCurrencyCodeMap = new Map<number, string>()
bankCurrencyCodeMap.set(UAH_CODE, UAH_NAME).set(USD_CODE, USD_NAME).set(EUR_CODE, EUR_NAME)
