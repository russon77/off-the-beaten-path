import { ExplorePage } from './app.po';

describe('explore App', () => {
  let page: ExplorePage;

  beforeEach(() => {
    page = new ExplorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
