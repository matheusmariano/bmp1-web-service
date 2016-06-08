import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'
import { User } from './user'

@Injectable()
export class UserService {
  private _apiUrl: string = 'http://localhost:3000'

  constructor(private _http: Http) {}

  all() {
    return this._http
      .get(`${this._apiUrl}/users`)
      .map(this._extract)
      .catch(this._handleError)
  }

  create(user: User) {
    let url: string = this._apiUrl + '/users'

    let headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    }

    let options = new RequestOptions({
      headers: new Headers(headers)
    })

    let body: string = JSON.stringify(user)

    return this._http
      .post(url, body, options)
      .map(this._extract)
      .catch(this._handleError)
  }

  private _extract(response: Response) {
    return response.json()
  }

  private _handleError(response: Response) {
    let error = response.json()

    console.error(error)
    return Observable.throw(error)
  }
}
