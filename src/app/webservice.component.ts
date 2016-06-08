import { Component } from '@angular/core';
import { RouteConfig , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
import { IndexComponent } from './+index';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { NewComponent } from './+new';

@Component({
  moduleId: module.id,
  selector: 'webservice-app',
  templateUrl: 'webservice.component.html',
  styleUrls: ['webservice.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    name: 'Index',
    path: '/',
    component: IndexComponent,
    useAsDefault: true
  },
  {
    name: 'New',
    path: '/adicionar',
    component: NewComponent
  }
])
export class WebserviceAppComponent {}
