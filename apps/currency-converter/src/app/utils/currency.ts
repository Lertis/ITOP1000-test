import * as mdl from '../model'

export function getCurrencyName (code: number): string {
  return mdl.bankCurrencyCodeMap.get(code)
}

export function getUkrCurrencyName (code: number): boolean {
  return code === mdl.UAH_CODE
}

export function mapMonoBankToCommonView (values: mdl.ICurrencyMonoBankView[]): mdl.ICurrencyHeaderView[] {
  const mapped: mdl.ICurrencyHeaderView[] = []
  values.forEach(v => {
    if (getUkrCurrencyName(v.currencyCodeB) && getCurrencyName(v.currencyCodeA)) {
      const obj: mdl.ICurrencyHeaderView = {
        currencyName: getCurrencyName(v.currencyCodeA),
        purchaseRate: v.rateSell,
        saleRate: v.rateBuy
      }
      mapped.push(obj)
    }
  })
  return mapped
}

export function mapPrivatBankToCommonView (values: mdl.ICurrencyPrivatBankView[]): mdl.ICurrencyHeaderView[] {
  const mapped = values.filter(v => v.ccy === mdl.USD_NAME || v.ccy === mdl.EUR_NAME)
  return mapped.map(v => {
    const obj: mdl.ICurrencyHeaderView = {
      currencyName: v.ccy,
      purchaseRate: parseFloat(v.sale),
      saleRate: parseFloat(v.buy),
    }
    return obj
  })
}
