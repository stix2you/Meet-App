// This file is used to set up the testing environment before each test file is run.
import '@testing-library/jest-dom';

// adjust Jest's default timeout if tests are long-running
jest.setTimeout(30000);

// Mocking ResizeObserver globally
// Extend the global environment to include a mock of the ResizeObserver
class MockResizeObserver {
   constructor(callback) {
       this.callback = callback;
       this.elements = [];
   }

   // ResizeObserver will observe the element
   observe(element) {
       this.elements.push(element);  // add the element to the elements array
       const rect = element.getBoundingClientRect();  // get the size of the element
       // call the callback function with the element and its size
       this.callback([{
           target: element,
           contentRect: rect
       }], this);  
   }

   unobserve(element) {
       this.elements = this.elements.filter(el => el !== element);
   }

   disconnect() {
       this.elements = [];
   }
}

// Define the ResizeObserver on the window object (the window object is the global object in the browser)
Object.defineProperty(window, 'ResizeObserver', {
   writable: true,
   configurable: true,
   value: MockResizeObserver
});

// This function will ensure all elements have a default size
// which is especially important in a testing environment where dimensions are often absent
document.createElement = ((originalCreateElement) => {
   return function(tagName, options) {
       const element = originalCreateElement.call(document, tagName, options);
       // Define default dimensions for the elements
       element.getBoundingClientRect = () => ({
           width: 500,  // Default width
           height: 300,  // Default height
           top: 0,
           left: 0,
           right: 500,
           bottom: 300
       });
       return element;
   };
})(document.createElement);

// suppress certain warning messages
const MESSAGES_TO_IGNORE = [
    "When testing, code that causes React state updates should be wrapped into act(...):",
    "Error:",
    "The above error occurred"
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
    const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
    if (!ignoreMessage) originalError(...args);
};






// import '@testing-library/jest-dom';

// // Here, add portions of the warning messages you want to intentionally prevent from appearing
// const MESSAGES_TO_IGNORE = [
//    "When testing, code that causes React state updates should be wrapped into act(...):",
//    "Error:",
//    "The above error occurred"
//  ];
 
//  const originalError = console.error.bind(console.error);
 
//  console.error = (...args) => {
//    const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
//    if (!ignoreMessage) originalError(...args);
//  }
 
// // jest.setTimeout(30000);

// const { ResizeObserver } = window;

// beforeEach(() => {
//   //@ts-ignore
//   delete window.ResizeObserver;   // delete the ResizeObserver from the window object
//   window.ResizeObserver = jest.fn().mockImplementation(() => ({  // mock the ResizeObserver
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//     disconnect: jest.fn(),
//   }));
// });

// afterEach(() => {
//   window.ResizeObserver = ResizeObserver;
//   jest.restoreAllMocks();
// });