import { Component, OnInit } from '@angular/core';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon'

@Component({
  moduleId: module.id,
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
  directives: [MD_LIST_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES],
  providers: [MdIconRegistry]
})
export class IndexComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
