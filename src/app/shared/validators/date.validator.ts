import { Directive, forwardRef, provide } from '@angular/core'
import { Control, NG_VALIDATORS, Validator, Validators } from '@angular/common'
import { isPresent } from '@angular/common/src/facade/lang'

@Directive({
  selector: '[nbDate][ngControl],[nbDate][ngModel],[nbDate][ngFormControl]',
  providers: [
    provide(NG_VALIDATORS, {
      useExisting: forwardRef(() => DateValidator),
      multi: true,
    }),
  ],
})
export class DateValidator implements Validator {
  validate(control) {
    return validateDate(control)
  }
}

export function validateDate(control: Control) {
  let pattern: RegExp = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g

  if (isPresent(Validators.required(control))) {
    return null
  }

  return pattern.test(control.value) ? null : {
    nbDate: {
      valid: false,
    },
  }
}
