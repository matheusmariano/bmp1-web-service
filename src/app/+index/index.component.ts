import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated'
import { MD_LIST_DIRECTIVES } from '@angular2-material/list'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  moduleId: module.id,
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
  directives: [MD_LIST_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES],
  providers: [MdIconRegistry, UserService]
})
export class IndexComponent implements OnInit {
  users: User[]

  constructor(
    private _router: Router,
    private _service: UserService
  ) {}

  ngOnInit() {
    this._service
      .all()
      .subscribe((users) => {
        this.users = users
      })
  }

  navigate(linkParams: any[]) {
    this._router.navigate(linkParams)
  }

}
