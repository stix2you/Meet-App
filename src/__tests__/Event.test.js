import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
   let EventComponent;
   let allEvents;

   beforeAll(async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
   });

   test('renders event title', () => {
      expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
   });

   test('renders event location', () => {
      expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
   });

   test('renders event details with the title (show details)', () => {
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
   });

   test('renders event details with the title (hide details)', () => {
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
   });

   test('renders event details with the description', () => {
      expect(EventComponent.queryByText(allEvents[0].description)).toBeInTheDocument();
   });




   
   test('by default, the event details are hidden', () => {
      expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
   });

   test("shows the details section when the user clicks on the'show details' button", async () => {
      userEvent.click(EventComponent.queryByText('show details'));
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
   });

   test("hides the details section when the user clicks on the'hide details' button", async () => {
      userEvent.click(EventComponent.queryByText('hide details'));
      expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
   });
});
