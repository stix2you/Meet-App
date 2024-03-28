import mockData from './mock-data';

//  * @param {*} events:
//  * The following function should be in the “api.js” file.
//  * This function takes an events array, then uses map to create a new array with only locations.
//  * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//  * The Set will remove all duplicates from the array.

// This function will extract the locations from the events
export const extractLocations = (events) => {
   const extractedLocations = events.map((event) => event.location);
   const locations = [...new Set(extractedLocations)];
   return locations;
};

const checkToken = async (accessToken) => {
   const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
   );
   const result = await response.json();
   return result;
};

const removeQuery = () => {
   let newurl;
   if (window.history.pushState && window.location.pathname) {
      newurl =
         window.location.protocol +
         "//" +
         window.location.host +
         window.location.pathname;
      window.history.pushState("", "", newurl);
   } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
   }
};

// This function will fetch the list of all events
export const getEvents = async () => {

   // check if the app is running in the local environment, and if so return the mock data
   if (window.location.href.startsWith('http://localhost')) {
      return Array.isArray(mockData) ? mockData : [];
   }

   // get the access token
   const token = await getAccessToken();

   // if the token is valid, fetch the list of events from the API
   if (token) {
      removeQuery();
      console.log('Token in getEvents function api.js:', token);
      const url = "https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/get-events" + "/" + token;
      try {
         const response = await fetch(url);
         const result = await response.json();
         return Array.isArray(result.events) ? result.events : [];  // return the list of events if the result is an array
      } catch (error) {
         console.error('Error fetching events:', error);  // log an error if there is an error fetching the events
      }
   }
   return []; // Ensure function always returns an array
};

// This function will get the token from the API
const getToken = async (code) => {
   const encodeCode = encodeURIComponent(code);
   const response = await fetch(
      'https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/token' + '/' + encodeCode
   );
   const { access_token } = await response.json();
   access_token && localStorage.setItem("access_token", access_token);

      console.log('Access Token in getToken function api.js:', access_token);
   return access_token;
};

// This function will get the list of events from the API
export const getAccessToken = async () => {
   const accessToken = localStorage.getItem('access_token');   // get the access token from local storage
   const tokenCheck = accessToken && (await checkToken(accessToken));   // check if the token is valid

   if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");
      if (!code) {
         const response = await fetch(
            "https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
         );
         const result = await response.json();
         const { authUrl } = result;
         return (window.location.href = authUrl);
      }
      return code && getToken(code);
   }
   return accessToken;
};