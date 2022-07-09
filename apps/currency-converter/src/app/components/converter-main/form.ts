import { AbstractControl, FormGroup } from '@angular/forms'

export interface IChangeForm {
  leftCurrencyValue: number
  leftCurrencyType: number
  rightCurrencyValue: number
  rightCurrencyType: number
}

export type ChangeFormControls = { [key in keyof IChangeForm]: AbstractControl }
export type ChangeFormGroup = FormGroup & { value: IChangeForm, controls: ChangeFormControls }
