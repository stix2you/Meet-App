Feature: Show hide an events details
   Scenario: An event element is collapsed by default.
      Given the user has just opened the app to the default view
      When the initial list of events is displayed
      Then they should be displayed in a collapsed format for readability

   Scenario: User can expand an event to see details.
      Given there is any list of collapsed events
      When the user clicks on "show details" button
      Then the view of that event should change from a collapsed view to a detailed view

   Scenario: User can collapse an event to hide details.
      Given an event view has been expanded
      When the user clicks on "hide details" button
      Then the view of that event should change from an expanded view to a collapsed view
