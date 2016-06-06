export class WebservicePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('webservice-app h1')).getText();
  }
}
