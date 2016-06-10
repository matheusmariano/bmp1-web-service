import { Component, OnInit } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common'
import { Router } from '@angular/router-deprecated'
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { Validators as NbValidators } from '../shared/validators/validators'
import { User } from '../user'
import { UserService } from '../user.service'
import { EmailService } from '../shared/services/email.service'
import { DatePipe } from '../shared/pipes/date.pipe'

@Component({
  moduleId: module.id,
  selector: 'app-new',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.css'],
  directives: [MD_TOOLBAR_DIRECTIVES, MD_ICON_DIRECTIVES, MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdIconRegistry, MdRadioDispatcher, UserService, EmailService, DatePipe]
})
export class NewComponent implements OnInit {

  form: ControlGroup
  model: User
  submit = { error: false }

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: UserService,
    private _emailService: EmailService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit() {
    this._initModel()
    this._applyValidators()
  }

  create() {
    let user = Object.assign({}, this.model)

    user.birthday = this._datePipe.transform(user.birthday, 'YYYY-MM-DD', 'DD/MM/YYYY')

    this._service
      .create(this.model)
      .subscribe((user) => {
        this._router.navigate(['Index'])
      }, (error) => {
        this.submit.error = true
      })
  }

  back(event: Event) {
    event.preventDefault()
    this._router.navigate(['Index'])
  }

  private _applyValidators(): void {
    this.form = this._formBuilder.group({
      name: [this.model.name, Validators.compose([
        Validators.required
      ])],
      email: [this.model.email, Validators.compose([
        Validators.required,
        NbValidators.email
      ]), NbValidators.unique(this._emailService)],
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
