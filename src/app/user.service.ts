import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

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

  private _extract(response: Response) {
    return response.json()
  }

  private _handleError(response: Response) {
    let error = response.json()

    console.error(error)
    return Observable.throw(error)
  }
}
