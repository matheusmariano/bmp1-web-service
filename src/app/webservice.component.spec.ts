import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { WebserviceAppComponent } from '../app/webservice.component';

beforeEachProviders(() => [WebserviceAppComponent]);

describe('App: Webservice', () => {
  it('should create the app',
      inject([WebserviceAppComponent], (app: WebserviceAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
