import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'
import { Config } from '../config'

export abstract class HttpService {
  constructor(private _http: Http) { }

  get(
    action: string,
    body = ''
  ) {
    let url: string = Config.apiUrl + action

    return this._http
      .get(url)
      .map(this._extract)
      .catch(this._handleError)
  }

  post(
    action: string,
    body = '',
    headers: { [key: string]: string } = {}
  ): Observable<any> {
    let url: string = Config.apiUrl + action

    headers['Content-Type'] = 'application/json'

    let options = new RequestOptions({
      headers: new Headers(headers),
    })

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
