import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
   let browser;
   let page;
   beforeAll(async () => {
      browser = await puppeteer.launch({
         // **** Uncomment the following three lines to run the tests in a visible browser ****
         //    headless: false,
         //    slowMo: 250, // slow down by 250ms,
         //    timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      });

      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event');
   });

   afterAll(() => {
      browser.close();
   });

   test('An event element is collapsed by default', async () => {
      const eventDetails = await page.$('.event .details');
      expect(eventDetails).toBeNull();
   });

   test('User can expand an event to see details', async () => {
      await page.click('.event .details-btn');
      const eventDetails = await page.$('.event .details');
      expect(eventDetails).toBeDefined();
   });

   test('User can collapse an event to hide details', async () => {
      await page.click('.event .details-btn');
      const eventDetails = await page.$('.event .details');
      expect(eventDetails).toBeNull();
   });
});

describe('Filter events by city', () => {
   let browser;
   let page;

   async function clearInput(selector) {
      await page.evaluate((sel) => { document.querySelector(sel).value = ''; }, selector);
   }

   beforeAll(async () => {
      browser = await puppeteer.launch({
         // **** Uncomment the following three lines to run the tests in a visible browser ****
         headless: false,
         slowMo: 250, // slow down by 250ms,
         timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      });

      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
   });

   afterAll(() => {
      browser.close();
   });

   test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
      const events = await page.$$('.event'); // Assuming each event has a class .event
      expect(events.length).toBeGreaterThan(0); // Check that events are displayed
   });

   test('User should see a list of suggestions when they search for a city.', async () => {
      await clearInput('input.city'); // Clear the input field first
      await page.type('input.city', 'Ber'); // Assuming the input for city search has a class .city-search
      const suggestions = await page.$$('.suggestions > li'); // Assuming suggestions are listed within li elements under a .suggestions container
      expect(suggestions.length).toBeGreaterThan(0);
   });

   test('User can select a city from the suggested list.', async () => {
      await clearInput('input.city'); // Clear the input field first
      await page.type('input.city', 'Berlin', { delay: 5 });

      await page.waitForSelector('.suggestions > li', { visible: true });
      await page.click('.suggestions > li');

      const city = await page.$eval('input.city', el => el.value);
      expect(city).toBe('Berlin, Germany');

      await page.waitForSelector('[data-testid="event"]', { visible: true });
      const events = await page.$$('[data-testid="event"]');
      expect(events.length).toBeGreaterThan(0);
   });
});