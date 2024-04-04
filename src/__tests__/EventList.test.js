import { render, screen, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';


describe('<EventList /> component', () => {

   // Test that the component renders a list of events
   test('has an element with "list" role', () => {
      // using mock data in this instance because we need to pass a prop to the EventList component, but cannot load async data in a test
      const mockEvents = [{ id: '1', name: 'Event 1' }, { id: '2', name: 'Event 2' }];
      render(<EventList events={mockEvents} />);
      const listElement = screen.getByRole('list'); // This line replaces EventListComponent.queryByRole("list")
      expect(listElement).toBeInTheDocument();
    });

   // Test that the component renders a list of events
   test('renders correct number of events', async () => {
      const allEvents = await getEvents();
      render(<EventList events={allEvents} />);
      const listItems = await screen.findAllByRole('listitem');
      expect(listItems).toHaveLength(allEvents.length);
   });

   test('does not render any events when the events prop is falsy', () => {
      render(<EventList events={null} />); // You can also test with events={undefined} or events={[]}
    
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0); // No list items should be rendered
    });
});

describe('<EventList /> integration', () => {

   // Test that the component renders a list of 32 events when the app is mounted and rendered
   test('renders a list of 32 events when the app is mounted and rendered', async () => {
      render(<App />);
      await waitFor(() => {
         expect(screen.getAllByRole('listitem')).toHaveLength(32);
      });
   });
});