import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated'
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { User } from '../user'
import { UserService } from '../user.service'
import { SexPipe } from '../shared/pipes/sex.pipe'
import { DatePipe } from '../shared/pipes/date.pipe'

@Component({
  moduleId: module.id,
  selector: 'app-show',
  templateUrl: 'show.component.html',
  styleUrls: ['show.component.css'],
  directives: [MD_TOOLBAR_DIRECTIVES, MD_ICON_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [UserService, MdIconRegistry],
  pipes: [SexPipe, DatePipe]
})
export class ShowComponent implements OnInit {

  user: User

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _service: UserService
  ) {}

  ngOnInit() {
    let endpoint: string = '/users/' + this._routeParams.get('id')

    this._service
      .get(endpoint)
      .subscribe((user: User) => {
        this.user = user
      })
  }

  edit(): void {
    this._router.navigate(['Edit', { id: this._routeParams.get('id') }])
  }

  delete(): void {
    this._router.navigate(['Delete', { id: this._routeParams.get('id') }])
  }

  back(): void {
    this._router.navigate(['Index'])
  }

}
