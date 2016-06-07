import { Component, OnInit } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'

@Component({
  moduleId: module.id,
  selector: 'app-new',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.css'],
  directives: [MD_INPUT_DIRECTIVES, MD_RADIO_DIRECTIVES, MD_BUTTON_DIRECTIVES],
  providers: [MdRadioDispatcher]
})
export class NewComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
