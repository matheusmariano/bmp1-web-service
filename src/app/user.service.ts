import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { HttpService } from './shared/services/http.service'
import { User } from './user'

@Injectable()
export class UserService extends HttpService {

  constructor(http: Http) {
    super(http)
  }

  all() {
    return this.get('/users')
  }

  create(user: User) {
    let body: string = JSON.stringify(user)

    return this.post('/users', body)
  }

  destroy(id: number | string) {
    let action: string = '/users/' + id

    return this.delete(action)
  }
}
