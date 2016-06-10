import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'
import { environment } from '../../environment'

export abstract class HttpService {
  constructor(private _http: Http) { }

  get(
    action: string,
    body = ''
  ): Observable<any> {
    let url: string = environment['api'] + action

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
    let url: string = environment['api'] + action

    headers['Content-Type'] = 'application/json'

    let options = new RequestOptions({
      headers: new Headers(headers),
    })

    return this._http
      .post(url, body, options)
      .map(this._extract)
      .catch(this._handleError)
  }

  patch(
    action: string,
    body = '',
    headers: { [key: string]: string } = {}
  ): Observable<any> {
    let url: string = environment['api'] + action

    headers['Content-Type'] = 'application/json'

    let options = new RequestOptions({
      headers: new Headers(headers),
    })

    return this._http
      .patch(url, body, options)
      .map(this._extract)
      .catch(this._handleError)
  }

  delete(action: string): Observable<any> {
    let url: string = environment['api'] + action

    return this._http
      .delete(url)
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
