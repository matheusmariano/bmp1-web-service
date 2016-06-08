import { validateDate } from './date.validator'
import { validateEmail } from './email.validator'
import { validateUnique } from './unique.validator'

export module Validators {
  export let date = validateDate
  export let email = validateEmail
  export let unique = validateUnique
}
