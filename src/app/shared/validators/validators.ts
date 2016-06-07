import { validateDate } from './date.validator'
import { validateEmail } from './email.validator'

export module Validators {
  export let date = validateDate
  export let email = validateEmail
}
