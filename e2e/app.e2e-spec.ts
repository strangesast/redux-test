import { ReduxTestPage } from './app.po';

describe('redux-test App', () => {
  let page: ReduxTestPage;

  beforeEach(() => {
    page = new ReduxTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
