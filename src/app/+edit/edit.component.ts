import { Component, OnInit } from '@angular/core'
import { ControlGroup, FormBuilder, Validators } from '@angular/common'
import { Router, RouteParams } from '@angular/router-deprecated'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { Validators as NbValidators } from '../shared/validators/validators'
import { User } from '../user'
import { UserService } from '../user.service'
import { EmailService } from '../shared/services/email.service'

@Component({
  moduleId: module.id,
  selector: 'app-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
  directives: [MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdRadioDispatcher, UserService, EmailService]
})
export class EditComponent implements OnInit {

  model: User
  form: ControlGroup

  constructor(
    private _emailService: EmailService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _routeParams: RouteParams,
    private _service: UserService
  ) {}

  ngOnInit() {
    this._initModel()
    this._applyValidators()
  }

  update(): void {
    let user = Object.assign({}, this.model)

    if (user.birthday) {
      let date = user.birthday.split('/')
      user.birthday = `${date[2]}-${date[1]}-${date[0]}`
    }

    this._service
      .update(user)
      .subscribe((user) => {
        this._router.navigate(['Show', { id: this._routeParams.get('id') }])
      }, (error) => {
        // 
      })
  }

  private _applyValidators() {
    this.form = this._formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        NbValidators.email
      ]), NbValidators.unique(this._emailService, this._routeParams.get('id'))],
      birthday: ['', Validators.compose([
        NbValidators.date
      ])]
    })
  }

  private _initModel(): void {
    let endpoint = '/users/' + this._routeParams.get('id')

    this._service
      .get(endpoint)
      .subscribe((user: User) => {
        if (user.birthday) {
          let date = user.birthday.split('-')
          user.birthday = `${date[2]}/${date[1]}/${date[0]}`
        }

        this.model = user
      })
  }

}
