'use client';

import React, { useState } from 'react';

// form
// submit
// log

export default function Page() {
  const [date, setDate] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Select a Date</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <p>Selected date: {date}</p>
    </div>
  );
}