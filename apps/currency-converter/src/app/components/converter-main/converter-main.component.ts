import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { debounceTime, filter, Observable, Subject, takeUntil } from 'rxjs'

import { ChangeFormControls, ChangeFormGroup } from './form'
import { LoadingCurrenciesService } from '../../services'

import * as mdl from '../../model'

@Component({
  selector: 'currency-converter-main',
  templateUrl: './converter-main.component.html',
  styleUrls: ['./converter-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterMainComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()

  private readonly USD = { key: mdl.USD_KEY, value: mdl.USD_NAME }
  private readonly EUR = { key: mdl.EUR_KEY, value: mdl.EUR_NAME }
  private readonly UAH = { key: mdl.UAH_KEY, value: mdl.UAH_NAME }
  private readonly initialLeftCurrencyList = [{ ...this.USD }, { ...this.EUR }, { ...this.UAH }]
  private readonly initialRightCurrencyList = [{ ...this.USD }, { ...this.EUR }, { ...this.UAH }]

  @Input() currencyValues: mdl.ICurrencyHeaderView[]

  changeForm = new FormGroup({
    leftCurrencyValue: new FormControl(null),
    leftCurrencyType: new FormControl(null),
    rightCurrencyValue: new FormControl(null),
    rightCurrencyType: new FormControl(null),
  } as ChangeFormControls) as ChangeFormGroup;

  leftCurrencyList = [...this.initialLeftCurrencyList]

  rightCurrencyList = [...this.initialRightCurrencyList]

  isLoading$: Observable<boolean> = this.loadingService.loading$

  constructor (private readonly loadingService: LoadingCurrenciesService) { }

  ngOnInit (): void {
    this.initFormSubscriptions()
  }

  private initFormSubscriptions (): void {
    this.changeForm.controls.leftCurrencyType.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const { leftCurrencyValue, leftCurrencyType, rightCurrencyType } = { ...this.changeForm.controls }
      this.restoreLists()
      if (!rightCurrencyType.value) {
        this.rightCurrencyList = this.rightCurrencyList.filter(e => e.key !== leftCurrencyType.value)
      } else {
        this.rightCurrencyList = this.rightCurrencyList.filter(e => e.key !== leftCurrencyType.value)
        this.leftCurrencyList = this.leftCurrencyList.filter(e => e.key !== rightCurrencyType.value)
      }

      if (leftCurrencyValue.value) {
        this.leftValueChangeCalclation()
      }
    })

    this.changeForm.controls.rightCurrencyType.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const { leftCurrencyType, rightCurrencyType, rightCurrencyValue } = { ...this.changeForm.controls }
      this.restoreLists()
      if (!leftCurrencyType.value) {
        this.leftCurrencyList = this.leftCurrencyList.filter(e => e.key !== rightCurrencyType.value)
      } else {
        this.rightCurrencyList = this.rightCurrencyList.filter(e => e.key !== leftCurrencyType.value)
        this.leftCurrencyList = this.leftCurrencyList.filter(e => e.key !== rightCurrencyType.value)
      }

      if (rightCurrencyValue.value) {
        this.rightValueChangeCalculation()
      }
    })

    this.changeForm.controls.leftCurrencyValue.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(() => this.filterValuesCalculations()),
      debounceTime(50)
    ).subscribe(() => this.leftValueChangeCalclation())

    this.changeForm.controls.rightCurrencyValue.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(() => this.filterValuesCalculations()),
      debounceTime(50)
    ).subscribe(() => this.rightValueChangeCalculation())
  }

  private uahToForeignCurrency (from: { value: number }, to: { type: number }): string {
    const name = this.getCurrencyNameById(to.type)
    const rate = this.currencyValues.find(e => e.currencyName === name).purchaseRate
    return parseFloat(`${from.value / rate}`).toFixed(2)
  }

  private foreignCurrencyToUah (from: { value: number }, to: { type: number }): string {
    const name = this.getCurrencyNameById(to.type)
    const rate = this.currencyValues.find(e => e.currencyName === name).saleRate
    return parseFloat(`${from.value * rate}`).toFixed(2)
  }

  private foreignCurrencyToForeign (from: { value: number, type: number }, to: { type: number }): number {
    const leftSideName = this.getCurrencyNameById(from.type)
    const leftSideRate = this.currencyValues.find(e => e.currencyName === leftSideName).saleRate
    const rightSideName = this.getCurrencyNameById(to.type)
    const rightSideRate = this.currencyValues.find(e => e.currencyName === rightSideName).saleRate
    return from.value * (leftSideRate / rightSideRate)
  }

  private leftValueChangeCalclation (): void {
    const { leftCurrencyValue, rightCurrencyType, leftCurrencyType } = { ...this.changeForm.controls }
    if (leftCurrencyType.value === mdl.UAH_KEY) {
      const result = this.uahToForeignCurrency({ value: leftCurrencyValue.value }, { type: rightCurrencyType.value })
      this.changeForm.controls.rightCurrencyValue.setValue(result, { emitEvent: false })
    } else {
      const result = rightCurrencyType.value === mdl.UAH_KEY
        ? this.foreignCurrencyToUah({ value: leftCurrencyValue.value }, { type: leftCurrencyType.value })
        : this.foreignCurrencyToForeign({ value: leftCurrencyValue.value, type: leftCurrencyType.value }, { type: rightCurrencyType.value })
      this.changeForm.controls.rightCurrencyValue.setValue(result, { emitEvent: false })
    }
  }

  private rightValueChangeCalculation (): void {
    const { rightCurrencyType, leftCurrencyType, rightCurrencyValue } = { ...this.changeForm.controls }
    if (leftCurrencyType.value === mdl.UAH_KEY) {
      const result = this.foreignCurrencyToUah({ value: rightCurrencyValue.value }, { type: rightCurrencyType.value })
      this.changeForm.controls.leftCurrencyValue.setValue(result, { emitEvent: false })
    } else {
      const result = rightCurrencyType.value === mdl.UAH_KEY
        ? this.uahToForeignCurrency({ value: rightCurrencyValue.value }, { type: leftCurrencyType.value })
        : this.foreignCurrencyToForeign({ value: rightCurrencyValue.value, type: rightCurrencyType.value }, { type: leftCurrencyType.value })
      this.changeForm.controls.leftCurrencyValue.setValue(result, { emitEvent: false })
    }
  }

  private restoreLists (): void {
    this.leftCurrencyList = [...this.initialLeftCurrencyList]
    this.rightCurrencyList = [...this.initialRightCurrencyList]
  }

  private filterValuesCalculations (): boolean {
    const { rightCurrencyType, leftCurrencyType } = { ...this.changeForm.controls }
    return rightCurrencyType.value && leftCurrencyType.value
  }

  private getCurrencyNameById (id: number): string {
    return {
      [mdl.USD_KEY]: mdl.USD_NAME,
      [mdl.EUR_KEY]: mdl.EUR_NAME,
      [mdl.UAH_KEY]: mdl.UAH_NAME
    }[id]
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
