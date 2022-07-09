import * as util from '../currency'
import * as set from './currency.set'

declare const expect: jest.Expect

describe('[Function: getCurrencyName]', () => {
  set.GET_CURRENCY_NAME_SET.forEach(item => {
    it(`should return ${item.result} with input: ${item.input}`, () => {
      expect(util.getCurrencyName(item.input)).toEqual(item.result)
    })
  })
})


describe('[Function: getUkrCurrencyName]', () => {
  set.GET_UKR_CURRENCY_NAME_SET.forEach(item => {
    it(`should return ${item.result} with input: ${item.input}`, () => {
      expect(util.getUkrCurrencyName(item.input)).toEqual(item.result)
    })
  })
})

describe('[Function: mapMonoBankToCommonView]', () => {
  set.MAP_MONOBANK_TO_COMMON_VIEW_SET.forEach((item, i) => {
    it(`should return mapped values #${i}`, () => {
      expect(util.mapMonoBankToCommonView(item.input)).toStrictEqual(item.result)
    })
  })
})

describe('[Function: mapPrivatBankToCommonView]', () => {
  set.MAP_PRIVATBANK_TO_COMMON_VIEW_SET.forEach((item, i) => {
    it(`should return mapped values #${i}`, () => {
      expect(util.mapPrivatBankToCommonView(item.input)).toStrictEqual(item.result)
    })
  })
})
