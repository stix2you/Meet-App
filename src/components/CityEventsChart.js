// this component is a chart that shows the number of events in each city
import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// ScatterChart imported as main chart, Scatter imported to draw the points, 
// XAxis and YAxis to draw the axis, CartesianGrid to draw the grid coordinate system,
// Tooltip to show the tooltips on hover, and ResponsiveContainer to make the chart responsive ans is the main container.

const CityEventsChart = ({ allLocations, events }) => {
   const [data, setData] = useState([]);  // 'data' holds the data for the chart

   // useEffect hook to set the data state when the component mounts
   useEffect(() => {
      setData(getData());  // set the 'data' state by calling the getData function
   }, [`${events}`]);  // callback of useEffect will be called whenever it detects a change in 'events',  ${events} converts events array to a string

   // the following function gets the data for the chart, returning an array of objects with the count and city name
   const getData = () => {
      // map over allLocations and filter the events based on the location and get the length of the filtered list
      const data = allLocations.map((location) => {
         const count = events.filter((event) => event.location === location).length  // filter the events based on the location and get the length of the filtered list
         const city = location.split((/, | - /))[0]   // split the location string by comma OR dash, and grab just the first element [0], which is just the city name
         return { count, city };  // return an object with the count and city name
      })
      return data;  // return the data, which should be an array of objects with the count and city name
   };

   // set width of ResponsiveContainer to 99% -- avoids the chart from overflowing its container, which creates responsiveness-related issues
   return (
      <ResponsiveContainer width="99%" height={400}>
         <ScatterChart
            margin={{
               top: 20,
               right: 20,
               bottom: 80,
               left: 0,
            }}
         >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
            <YAxis type="number" dataKey="count" name="Number of Events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8" />
         </ScatterChart>
      </ResponsiveContainer>
   );
}

export default CityEventsChart;