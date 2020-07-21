const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  // close browser after each test
  await page.close();
});

test('The header brand has the correct text', async () => {
  const text = await page.getInnerHTML('a.brand-logo');

  expect(text).toEqual('Blogster');
});

test('Clicking login start oauth flow', async () => {
  await page.click('.right a');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  await page.login();
  //get logout link from dom
  const text = await page.getInnerHTML('a[href="/auth/logout"]');

  expect(text).toEqual('Logout');
});
