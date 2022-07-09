import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Self } from '@angular/core'

import { cloneDeep } from 'lodash'
import { delay, Subscription } from 'rxjs'

import { BankFacadeService, LoadingCurrenciesService } from './services'
import { ICurrencyHeaderView } from './model'

@Component({
  selector: 'currency-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingCurrenciesService],
  viewProviders: [LoadingCurrenciesService]
})
export class AppComponent implements OnDestroy {
  private subscription: Subscription

  currencyValues: ICurrencyHeaderView[] = []

  constructor (
    @Self() private readonly loadingService: LoadingCurrenciesService,
    private readonly bank: BankFacadeService,
    private readonly cdr: ChangeDetectorRef) { }

  bankSelected (name: string) {
    this.loadingService.setState(true)
    this.checkSubscription()
    this.subscription = this.bank.getBankInstance(parseInt(name, 10)).getCurrencyExchangeRateForHeaderView()
      // delay 1w
      .pipe(delay(1000)).subscribe(v => {
        this.currencyValues = cloneDeep(v)
        this.loadingService.setState(false)
        this.cdr.detectChanges()
      })
  }

  private checkSubscription (): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnDestroy (): void {
    this.checkSubscription()
  }
}
