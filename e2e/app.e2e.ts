import { WebservicePage } from './app.po';

describe('webservice App', function() {
  let page: WebservicePage;

  beforeEach(() => {
    page = new WebservicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('webservice works!');
  });
});
