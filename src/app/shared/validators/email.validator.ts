import { Directive, forwardRef, provide } from '@angular/core'
import { Control, NG_VALIDATORS, Validator, Validators } from '@angular/common'
import { isPresent } from '@angular/common/src/facade/lang'

@Directive({
  selector: '[nbEmail][ngControl],[nbEmail][ngModel],[nbEmail][ngFormControl]',
  providers: [
    provide(NG_VALIDATORS, {
      useExisting: forwardRef(() => EmailValidator),
      multi: true,
    }),
  ],
})
export class EmailValidator implements Validator {
  validate(control) {
    return validateEmail(control)
  }
}

export function validateEmail(control: Control) {
  let pattern: RegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

  if (isPresent(Validators.required(control))) {
    return null
  }

  return pattern.test(control.value) ? null : {
    nbEmail: {
      valid: false,
    },
  }
}
