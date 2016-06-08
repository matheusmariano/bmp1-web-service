import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  moduleId: module.id,
  selector: 'app-show',
  templateUrl: 'show.component.html',
  styleUrls: ['show.component.css'],
  directives: [MD_BUTTON_DIRECTIVES],
  providers: [UserService]
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
        switch (user.sex) {
          case "female":
            user.sex = "Feminino"
            break;

          case "male":
            user.sex = "Masculino"
            break;
          
          default:
            user.sex = "Não definido"
            break;
        }

        if (user.birthday) {
          let date = user.birthday.split('-')
          user.birthday = `${date[2]}/${date[1]}/${date[0]}`
        } else {
          user.birthday = 'Não definido'
        }

        this.user = user
      })
  }

  delete(): void {
    this._router.navigate(['Delete', { id: this._routeParams.get('id') }])
  }

}
