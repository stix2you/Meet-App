import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
   let browser;
   let page;
   beforeAll(async () => {
      browser = await puppeteer.launch({
         // **** Uncomment the following three lines to run the tests in a visible browser ****
         //    headless: false,
         //    slowMo: 50, // slow down by X number of ms,
         //    timeout: 0 // removes any puppeteer/browser timeout limitations
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

   beforeAll(async () => {
      browser = await puppeteer.launch({
         // **** Uncomment the following three lines to run the tests in a visible browser ****
         // headless: false,
         // slowMo: 50, // slow down by X number of ms
         // timeout: 0 // removes any puppeteer/browser timeout limitations
      });

      page = await browser.newPage();
      page.setViewport({ width: 1280, height: 800 }); // Set a specific viewport size -- 
      // when running in headless mode, the default viewport is 800x600, which may not allow certain items to render to be tested properly.
      await page.goto('http://localhost:3000/');
   });

   afterAll(() => {
      browser.close();
   });

   // function to clear the input field between tests
   async function clearInput(selector) {
      await page.evaluate((sel) => { document.querySelector(sel).value = ''; }, selector);
   }

   test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
      const events = await page.$$('.event');   // this will return an array of all the events
      expect(events.length).toBeGreaterThan(0); // check that events are displayed
   });

   test('User should see a list of suggestions when they search for a city.', async () => {
      await clearInput('input.city'); // clear the input field first
      await page.type('input.city', 'Ber'); // type 'Ber' to search for Berlin
      const suggestions = await page.$$('.suggestions > li'); // check for the number of suggestions
      expect(suggestions.length).toBeGreaterThan(0);
   });

   test('User can select a city from the suggested list.', async () => {
      await clearInput('input.city'); // clear the input field first
      await page.type('input.city', 'Berlin', { delay: 5 });   // type 'Berlin' to search for Berlin

      await page.waitForSelector('.suggestions > li', { visible: true });  // wait for the suggestions to be visible
      await page.click('.suggestions > li');                               // click on the first suggestion      

      const city = await page.$eval('input.city', el => el.value);   // get the value of the input field
      expect(city).toBe('Berlin, Germany');                          // check that the value of the input field is 'Berlin, Germany' 

      await page.waitForSelector('[data-testid="event"]', { visible: true }); // wait for the events to be visible
      const events = await page.$$('[data-testid="event"]');                  // get all the events
      expect(events.length).toBeGreaterThan(0);                          // check that events are displayed
   });
});

describe('Specify Number of Events', () => {
   let browser;
   let page;

   beforeAll(async () => {
      browser = await puppeteer.launch({
         // **** Uncomment the following three lines to run the tests in a visible browser ****
         // headless: false, // Toggle this for visual debugging
         // slowMo: 50, // Slow down by X number of ms
         // timeout: 0 // Removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest, see below inside of tests)
      });

      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
   });

   afterAll(() => {
      browser.close();
   });

   // function to clear the input field between tests
   async function clearInput(selector) {
      await page.evaluate((sel) => { document.querySelector(sel).value = ''; }, selector);   // clear the input field
      await page.evaluate((sel) => {                           // trigger change event to ensure React state updates correctly
         const event = new Event('input', { bubbles: true });  // create a new input event
         document.querySelector(sel).dispatchEvent(event);     // dispatch the event
      }, selector);                                            // pass the selector to the function
   }

   test('When user hasn\'t specified a number, 32 is the default number of events', async () => {
      const numberOfEventsInput = await page.$eval('input.number-of-events', el => el.value);  // get the value of the input field
      expect(numberOfEventsInput).toBe('32');   // check that the default value is 32

      const events = await page.$$('[data-testid="event"]');   // get all the events
      expect(events.length).toBeLessThanOrEqual(32);  // check that the number of events is less than or equal to 32
   });

   test('User can change the number of events displayed', async () => {
      await clearInput('input.number-of-events');  // clear the input field first
      await page.type('input.number-of-events', '10', { delay: 50 });  // type 10 in the input field

      await page.waitForFunction('document.querySelectorAll("[data-testid=\'event\']").length === 10'); // wait for the number of events to be 10
      const events = await page.$$('[data-testid="event"]');   // get all the events
      expect(events.length).toBe(10);  // check that the number of events is 10
   });
});
