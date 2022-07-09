import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { SpinnerModule } from '@currency/shared-component'

import { AppComponent } from './app.component'
import { ConverterHeaderComponent, ConverterMainComponent } from './components'

import * as serv from './services'
import * as bankTokens from './tokens'

const COMPONENTS = [
  AppComponent,
  ConverterHeaderComponent,
  ConverterMainComponent,
]

const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    ...MATERIAL
  ],
  providers: [
    serv.BankFacadeService,
    serv.PrivatBankFacadeService,
    serv.MockPrivatBankFacadeService,
    serv.MonoBankFacadeService,
    serv.MockMonoBankFacadeService,
    {
      provide: bankTokens.PB_CURRENCY_URL,
      useValue: bankTokens.PRIVAT_BANK_CURRENCY_URL
    },
    {
      provide: bankTokens.MB_CURRENCY_URL,
      useValue: bankTokens.MONO_BANK_CURRENCY_URL
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
