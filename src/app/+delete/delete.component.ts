import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { UserService } from '../user.service'

@Component({
  moduleId: module.id,
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['delete.component.css'],
  directives: [MD_BUTTON_DIRECTIVES],
  providers: [UserService]
})
export class DeleteComponent implements OnInit {

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _service: UserService
  ) {}

  ngOnInit() {
  }

  delete() {
    this._service
      .destroy(this._routeParams.get('id'))
      .subscribe((response) => {
        this._router.navigate(['Index'])
      }, (error) => {
        // 
      })
  }

  cancel() {
    this._router.navigate(['Show', { id: this._routeParams.get('id') }])
  }

}
