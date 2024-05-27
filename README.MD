Project description:
Meet App is a serverless, progressive web app, which is an electronic bulleton board for events in cities around the globe.  It allows users to get information about upcoming events in any city, and to filter the results by city or keyword. Additionally, users may choose to view charts depicting data about the number of events in a given area, as well as the popularity of various event genres.

To Build and Deploy:
Build with npx react to include PWA coding templates:
npx create-react-app meet --template cra-template-pwa --use-npm
Add to package.json after "private: true":  "homepage": "https://YOUR_USER_NAME.github.io/Meet-App", 
Add to package.json in scripts section:  
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
Push changes to repo and deploy with terminal command:  "npm run deploy"

Project dependencies:
React v. 18.2.0
React-dom v. 18.2.0
React-scripts v. 5.0.1
gh-pages installed
cra-template-pwa starter codebase installed 
(...or just copy dependencies from package.json and execute "npm install" from terminal)

No API used.

Tech Stack used: MERN

Live URL: https://stix2you.github.io/Meet-App/




Meet App User Stories:
======================

Feature 1: Filter Events By City
As a user, 
I should be able to filter events by city, 
so that I can see a list of events taking place in that city.

Feature 2: Show/Hide Event Details
As a user, 
I should be able to select to either show or hide event details, 
so that I can either see details for events or have an uncluttered list of events as I choose. 

Feature 3: Specify Number of Events
As a user, 
I should be able to specify the number of events in my view, 
so I can taylor the view to a comfortable and readable length, and not be oversaturated with information.

Feature 4: Use the App when Offline
As a user, 
I should be able to use the app offline, 
so that I can continue to have functionality when I'm unable to have network access, such as spotty mobile reception or airplane mode.

Feature 5: Add an App Shortcut to the home screen
As a user, 
I should be able to add an app shortcut to my homescreen, 
so I can have easy and immediate access to the app.

Feature 6: Display Charts Visualizing Event Details
As a user, 
I should be able to view charts which visualize event details, 
so that I can easily group and visualize common attributes of different events.  




===================
Meet App Scenarios:
===================

--------------------------------
Feature 1: Filter Events By City
--------------------------------

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
 - Given a user hasn't search for any city,
 - When the user opens the app,
 - Then the user should see a list of upcoming events.

Scenario 2: User should see a list of suggestions when they search for a city.
 - Given the main page is open,
 - When a user starts typing in the city textbox,
 - Then the user should receive a list of suggested cities that match what they have typed.

Scenario 3: User can select a city from the suggested list.
 - Given the user was typing "Berlin" in the city textbox AND the list of suggested cities is showing,
 - When the user selects a city(like "Berlin") from the list,
 - Then their city should be changed to that city (i.e., "Berlin, Germany") AND the user should receive a list of upcoming events in that city.




----------------------------------
Feature 2: Show/Hide Event Details
----------------------------------

Scenario 1: An event element is collapsed by default.
 - Given any number of events have been displayed on the screen,
 - When they are displayed,
 - Then they should be displayed in a collapsed format for readability.


Scenario 2: User can expand an event to see details.
 - Given there is any list of collapsed events ,
 - When the user clicks on "show details" button,
 - Then the view of that event should change from a collapsed view to a detailed view.


Scenario 3: User can collapse an event to hide details.
 - Given an event view has been expanded,
 - When the user clicks on "hide details" button,
 - Then the view of that event should change from an expanded view to a collapsed view.



-----------------------------------
Feature 3: Specify Number of Events
-----------------------------------

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
 - Given the main page is open, 
 - When the user has not selected the number of events to show at once,
 - Then the list should display only up to 32 events on the given page by default


Scenario 2: User can change the number of events displayed.
 - Given the main page is open,
 - When the user selects a number of pages they want to see at once in the "Number of Events" field,
 - Then the list to populate up to the number of events the user selected on a given page



-----------------------------------
Feature 4: Use the App When Offline
-----------------------------------

Scenario 1: Show cached data when there’s no internet connection.
 - Given the internet connection was lost or not established,
 - When the user views information for a search which has already been performed,
 - Then display existing data from local storage for the user's search, AND inform the user that the information may not current, the connection has been lost, and a current search is not possible until the connection is regained.


Scenario 2: Show error when user changes search settings (city, number of events).
 - Given the internet connection was lost or not established.
 - When the user changes the search criteria to a search which has not previously been performed,
 - Then inform the user that the connection has been lost and the search is not possible until connection has been regained.



-------------------------------------------------
Feature 5: Add an App Shortcut to the Home Screen
-------------------------------------------------

Scenario 1: User can install the meet app as a shortcut on their device home screen.
 - Given the user has navigated to the web page for the app
 - When it is the first visit for the user OR if they have selected the option to add a shortcut to their home screen,
 - Then ask the user if they would like a shortcut added to their homescreen, and add the shortcut to the user's homescreen at user's request or consent as applicable. 



---------------------------------------------------
Feature 6: Display Charts Visualizing Event Details
---------------------------------------------------

Scenario 1: Show a chart with the number of upcoming events in each city.
 - Given a city has been selected
 - When the user requests visual data on the number of upcoming events in that city
 - Then display a graph or chart depicting the data in a visual format which is fast to load, quick to read, and easy to understand. 



----------------------------------------------------
How I will use serverless functions in the Meet App:
----------------------------------------------------

I will use serverless for authorization and to fetch calendar events.  This will consist of three functions:

getAuthURL: returns authorization URL, Google displays a consent screen to the user

getAccessToken: if the user approves, the auth code received from getAuthURL is passed to Google and exchanged for a temporary access token

getCalendarEvents: attaches access token and fetches the requested data from Google (if the token is valid)

Possibly a fourth functionon which will provide email notification or push notification to users to remind them of upcoming events they selected


![App Architecture From 4.2 Reading](./img/scenario-two-detailed.png)
