import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { HttpService } from './http.service'
import { UniqueService } from '../validators/unique.validator'

@Injectable()
export class EmailService extends HttpService implements UniqueService {

  constructor(http: Http) {
    super(http)
  }

  getUnique(email: string, ignoreId?: string | number) {
    let body: string = JSON.stringify({ email, ignore_id: ignoreId })
    return this.post('/users/email', body)
  }

}
