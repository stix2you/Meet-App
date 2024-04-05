Feature: Specify Number of Events
   Scenario: When user hasn't specified a number, 32 is the default number of events
      Given the app is opened in its default state
      When the user hasn't specified a number of events
      Then 32 is displayed in the input field for number of events
      And the number of events shown matches the number of events in the data, up to 32

   Scenario: User can change the number of events displayed
      Given the app is rendered
      When the user enters a number in the number of events input field
      Then the number of events shown matching the number of events in the data, up to the number entered