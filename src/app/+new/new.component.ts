import { Component, OnInit } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { Validators as NbValidators } from '../shared/validators/validators'

@Component({
  moduleId: module.id,
  selector: 'app-new',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.css'],
  directives: [MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdRadioDispatcher]
})
export class NewComponent implements OnInit {

  form: ControlGroup

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this._applyValidators()
  }

  private _applyValidators(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        NbValidators.email
      ])],
      birthday: ['', Validators.compose([
        NbValidators.date
      ])]
    })
  }

}
