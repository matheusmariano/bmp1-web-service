import { Component, OnInit } from '@angular/core'
import { ControlGroup, FormBuilder, Validators } from '@angular/common'
import { Router, RouteParams } from '@angular/router-deprecated'
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
  selector: 'app-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
  directives: [MD_TOOLBAR_DIRECTIVES, MD_ICON_DIRECTIVES, MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdIconRegistry, MdRadioDispatcher, UserService, EmailService, DatePipe]
})
export class EditComponent implements OnInit {

  model: User
  form: ControlGroup

  constructor(
    private _emailService: EmailService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _routeParams: RouteParams,
    private _service: UserService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit() {
    this._initModel()
    this._applyValidators()
  }

  update(): void {
    let user = Object.assign({}, this.model)

    user.birthday = this._datePipe.transform(user.birthday, 'YYYY-MM-DD', 'DD/MM/YYYY')

    this._service
      .update(user)
      .subscribe((user) => {
        this._router.navigate(['Show', { id: this._routeParams.get('id') }])
      }, (error) => {
        // 
      })
  }

  back(event: Event): void {
    event.preventDefault()
    this._router.navigate(['Show', { id: this._routeParams.get('id') }])
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
        user.birthday = this._datePipe.transform(user.birthday, 'DD/MM/YYYY')
        this.model = user
      })
  }

}
