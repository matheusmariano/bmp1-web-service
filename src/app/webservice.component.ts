import { Component } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import { IndexComponent } from './+index';
import { NewComponent } from './+new';
import { ShowComponent } from './+show';
import { EditComponent } from './+edit';
import { DeleteComponent } from './+delete';

@Component({
  moduleId: module.id,
  selector: 'webservice-app',
  templateUrl: 'webservice.component.html',
  styleUrls: ['webservice.component.css'],
  directives: [ROUTER_DIRECTIVES],
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
  },
  {
    name: 'Show',
    path: '/:id',
    component: ShowComponent
  },
  {
    name: 'Edit',
    path: '/:id/editar',
    component: EditComponent
  },
  {
    name: 'Delete',
    path: '/:id/excluir',
    component: DeleteComponent
  }
])
export class WebserviceAppComponent {}
