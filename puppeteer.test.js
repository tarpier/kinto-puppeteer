const puppeteer = require('puppeteer');

describe("Tests kintohub's title", () => {

  let browser,page;

  beforeAll(async () => {

      // use this var to run check tests locally
      const headless = !!!process.env.E2E_NO_HEADLESS;
      let pappeteerAdditionalConf = {};
      if (!headless) {
          pappeteerAdditionalConf = {
              ...pappeteerAdditionalConf,
              slowMo: 150,
          };
      }

      browser = await puppeteer.launch({
          headless,
          args:       ['--no-sandbox', '--disable-setuid-sandbox'],
          devtools:   !headless,
          ...pappeteerAdditionalConf,
      });

      page = await browser.newPage();

      if (!headless) {
          page.emulate({
              viewport: {
                  width: 500,
                  height: 900
              },
              userAgent: ''
          });
      }
  });

  afterAll(() => {
    browser.close();
  })

  it('should be titled properly', async () => {
    await page.goto('https://kintohub.com');
    await expect(page.title()).resolves.toMatch('KintoHub - Build cloud native apps in seconds | KintoHub - Build cloud native apps in seconds');
  });
});