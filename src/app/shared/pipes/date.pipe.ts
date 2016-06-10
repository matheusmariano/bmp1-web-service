import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({ name: 'bmDate' })
export class DatePipe implements PipeTransform {
  transform(date: string, toFormat: string, fromFormat = 'YYYY-MM-DD'): string {
    let m = moment(date, fromFormat)

    if (m.isValid()) {
      return m.format(toFormat)
    }

    return ''
  }
}
