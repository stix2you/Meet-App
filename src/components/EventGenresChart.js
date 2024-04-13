// This component displays a pie chart of the number of events for each genre, using the recharts library
import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EventGenresChart = ({ events }) => {
   const [data, setData] = useState([]);  // 'data' holds the data for the chart
   const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];  // genres array
   const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85144b'];

   // useEffect hook to set the data state when the component mounts
   useEffect(() => {
      setData(getData());  // set the 'data' state by calling the getData function
   }, [`${events}`]);  // callback of useEffect will be called whenever it detects a change in 'events',  ${events} converts events array to a string

   // the following function gets the data for the chart, returning an array of objects with the count and city name
   const getData = () => {
      // map over allLocations and filter the events based on the location and get the length of the filtered list
      const data = genres.map(genre => {
         const filteredEvents = events.filter((event) => event.summary.includes(genre));  // filter the events based on the genre
         return { name: genre, value: filteredEvents.length };  // return an object with genre name and length of the filtered list (number of this event genre)
      })
      return data;  // return the data, which should be an array of objects with the genre name and genre count or "value"
   };

   // the following function renders the customized label for the chart, as a genre and percentage, applied to Pie container below
   const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius;
      const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
      const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
      return percent ? (
         <text
            x={x}
            y={y}
            fill={colors[index]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
         >
            {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
         </text>
      ) : null;
   };

   return (
      <ResponsiveContainer width="99%" height={400}>
         <PieChart>
            <Pie
               data={data}
               dataKey="value"
               fill="#8884d8"
               labelLine={false}
               label={renderCustomizedLabel}
               outerRadius={130}
            >
               {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
               ))}
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );

}

export default EventGenresChart;