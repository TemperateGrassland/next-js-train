'use client'


import React, { ChangeEventHandler, EventHandler, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles for the calendar
import { Value } from 'react-calendar/dist/esm/shared/types.js';

function DateNameForm() {
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [name, setName] = useState('');
  const [entries, setEntries] = useState([]);

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [entries, setEntries] = useState<{ date: Date; name: string }[]>([]);


    // Add the date-name pair to the list of entries
    setEntries([...entries, { date: selectedDate, name }]);
    setName(''); // Clear the name field after submission
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Date and Name Association</h2>
      
      {/* Calendar Component */}
      <div>
        <h3>Select a Date:</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          view="year"  
        />
      </div>

      {/* Form for Name */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label>
          <h3>Enter Name:</h3>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter a name"
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              marginBottom: '10px',
              width: '100%',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>

      {/* Display Entries */}
      <div style={{ marginTop: '30px' }}>
        <h3>Entries:</h3>
        <ul>
          {entries.map((entry: { date: Date; name: string }, index) => (
            <li key={index}>
              {entry.name} - {entry.date.toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DateNameForm;