import { Component, OnInit } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common'
import { Router } from '@angular/router-deprecated'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { Validators as NbValidators } from '../shared/validators/validators'
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  moduleId: module.id,
  selector: 'app-new',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.css'],
  directives: [MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdRadioDispatcher, UserService]
})
export class NewComponent implements OnInit {

  form: ControlGroup
  model: User
  submit = { error: false }

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: UserService
  ) {}

  ngOnInit() {
    this._initModel()
    this._applyValidators()
  }

  create() {
    let user = Object.assign({}, this.model)

    if (user.birthday) {
      let date = user.birthday.split('/')
      user.birthday = `${date[2]}-${date[1]}-${date[0]}`
    }

    this._service
      .create(this.model)
      .subscribe((user) => {
        this._router.navigate(['Index'])
      }, (error) => {
        this.submit.error = true
      })
  }

  private _applyValidators(): void {
    this.form = this._formBuilder.group({
      name: [this.model.name, Validators.compose([
        Validators.required
      ])],
      email: [this.model.email, Validators.compose([
        Validators.required,
        NbValidators.email
      ])],
      birthday: [this.model.birthday, Validators.compose([
        NbValidators.date
      ])]
    })
  }

  private _initModel(): void {
    this.model = new User()
    this.model.name = ''
    this.model.email = ''
    this.model.birthday = ''
  }

}
