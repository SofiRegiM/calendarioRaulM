import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // includes default styling

function MyCalendar() {
    const [date, setDate] = useState(new Date());

    const onChange = newDate => {
        setDate(newDate);
        // Optionally fetch appointment data from the backend for this date
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
}

export default MyCalendar;