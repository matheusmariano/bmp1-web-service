import { Component } from '@angular/core';
import { IndexComponent } from './+index';
import { RouteConfig , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'webservice-app',
  templateUrl: 'webservice.component.html',
  styleUrls: ['webservice.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {path: '/', component: IndexComponent}
])
export class WebserviceAppComponent {}
