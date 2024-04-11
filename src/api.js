import mockData from './mock-data';
import NProgress from 'nprogress';

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

// This function will check if the token is valid
const checkToken = async (accessToken) => {
   const response = await fetch(                    // send a request to the API to check if the token is valid
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
   );
   const result = await response.json();            // get the result from the response
   return result;                                  // return the result
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

   if (!navigator.onLine) {
      console.log('offline logic of getEvents fired');
      const events = localStorage.getItem("lastEvents");
      NProgress.done();
      console.log('offline events in the offline logic of getEvents:', events);
      return events ? JSON.parse(events) : [];  // return the list of events if the result is an array, otherwise return an empty array
   }

   // check if the app is running in the local environment, and if so return the mock data
   if (window.location.href.startsWith('http://localhost')) {
      return Array.isArray(mockData) ? mockData : [];    // return the mock data if it is an array, otherwise return an empty array
   }

   // get the access token
   const token = await getAccessToken();

   // if the token is valid, fetch the list of events from the API
   if (token) {
      removeQuery();      // remove the query from the URL, 
      const url = "https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/get-events" + "/" + token;
      try {
         console.log('online logic of getEvents fired');
         const response = await fetch(url);
         const result = await response.json();
         if (result) {
            NProgress.done();
            localStorage.setItem("lastEvents", JSON.stringify(result.events));
            console.log('online events in the online logic of getEvents:', result.events);
            return Array.isArray(result) ? result : [];  // return the list of events if the result is an array, otherwise return an empty array
            // return result.events;
         } else return null;
      } catch (error) {
         console.error('Error fetching events:', error);  // log an error if there is an error fetching the events
      }
   }
   return []; // Ensure function always returns an array
};

// This function will get the token from the API, store it in local storage, and return it, should only be called if there is no token in local storage
const getToken = async (code) => {
   const encodeCode = encodeURIComponent(code);  // encode the code before sending it to the API
   const response = await fetch(                // send a request to the API to get the token
      'https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/token' + '/' + encodeCode
   );
   const { access_token } = await response.json();           // get the access token from the response
   access_token && localStorage.setItem("access_token", access_token);   // store the access token in local storage

   return access_token;                                           // return the access token
};

// This function will get the list of events from the API
export const getAccessToken = async () => {
   const accessToken = localStorage.getItem('access_token');   // get the access token from local storage
   const tokenCheck = accessToken && (await checkToken(accessToken));   // check if the token is valid

   // if there is no access token in local storage OR the token is invalid, get the token from the API
   if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");                     // remove the token from local storage
      const searchParams = new URLSearchParams(window.location.search);  // get the search parameters from the URL (this is the code from the API)
      const code = await searchParams.get("code");                       // get the code from the search parameters
      if (!code) {                                                       // if there is no code, get the code from the API   
         const response = await fetch(                                   // send a request to the API to get the authentication URL
            "https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
         );
         const result = await response.json();                           // get the result from the response
         const { authUrl } = result;                                     // get the authentication URL from the result
         return (window.location.href = authUrl);                        // redirect the user to the authentication URL
      }
      return code && getToken(code);                                  // getToken is only called if there wasn't a token in local storage
   }
   return accessToken;
};



// This function will fetch the list of all events
// export const getEvents = async () => {

//    // check if the app is running in the local environment, and if so return the mock data
//    if (window.location.href.startsWith('http://localhost')) {
//       return Array.isArray(mockData) ? mockData : [];    // return the mock data if it is an array, otherwise return an empty array
//    }

//    // get the access token
//    const token = await getAccessToken();

//    // if the token is valid, fetch the list of events from the API
//    if (token) {
//       removeQuery();      // remove the query from the URL,
//       const url = "https://j1afvdafm1.execute-api.us-east-2.amazonaws.com/dev/api/get-events" + "/" + token;
//       try {
//          const response = await fetch(url);
//          const result = await response.json();
//          return Array.isArray(result) ? result : [];  // return the list of events if the result is an array, otherwise return an empty array
//       } catch (error) {
//          console.error('Error fetching events:', error);  // log an error if there is an error fetching the events
//       }
//    }
//    return []; // Ensure function always returns an array
// };