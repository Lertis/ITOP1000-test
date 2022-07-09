import { ChangeDetectionStrategy, Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Observable, skip, Subject, takeUntil } from 'rxjs'

import { LoadingCurrenciesService } from '../../services'
import * as mdl from '../../model'

@Component({
  selector: 'currency-converter-header',
  templateUrl: './converter-header.component.html',
  styleUrls: ['./converter-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterHeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>()
  private readonly initialBank = mdl.BankName.PRIVATBANK

  @Input() currencyValues: mdl.ICurrencyHeaderView[]

  @Output() bankSelected = new EventEmitter<string>()

  banksList = []
  bank = new FormControl('', [Validators.required])

  isLoading$: Observable<boolean> = this.loadingService.loading$

  constructor (@Host() private readonly loadingService: LoadingCurrenciesService) { }

  ngOnInit (): void {
    this.initBanksList()
    this.initFormSubscription()
    this.setValues()
  }

  private initBanksList (): void {
    for (const [key, value] of Object.entries(mdl.BanksNaming)) {
      this.banksList.push({ key, value })
    }
  }

  private initFormSubscription (): void {
    this.bank.valueChanges.pipe(
      takeUntil(this.destroy$),
      skip(1)
    ).subscribe((v) => this.bankSelected.emit(v))
  }

  private setValues (): void {
    this.bank.setValue(`${this.initialBank}`)
    this.bankSelected.emit(`${this.initialBank}`)
  }

  ngOnDestroy (): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
