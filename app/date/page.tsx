// form
// submit
// log



// 'use client';

// import React, { useState } from 'react';



// export default function Page() {
//   const [date, setDate] = useState('');

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Select a Date</h1>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <p>Selected date: {date}</p>
//     </div>
//   );
// }


// 'use client'; // For client-side rendering

// import React from 'react';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const locales = {
//   'en-US': require('date-fns/locale/en-US'),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const events = [
//   {
//     title: 'Meeting',
//     start: new Date(),
//     end: new Date(),
//   },
// ];

// export default function Page() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Event Calendar</h1>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// }


// Select a Date
// create form
// submit form to state

// 'use client'; // For client-side components

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Default CSS for styling

// export default function Page() {
//   const [date, setDate] = useState(new Date());

//   const onChange = (newDate: Date) => {
//     setDate(newDate);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>My Calendar</h1>
//       <Calendar onChange={onChange} value={date} />
//       <p>Selected date: {date.toDateString()}</p>
//     </div>
//   );
// }

import DateNameForm from '@/app/ui/DateNameForm';

export default function Page() {
  return (
    <div>
      <DateNameForm />
    </div>
  );
}

