import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
//to change styling, find the above imported file under node modules


const localizer = momentLocalizer(moment);

const Roster = ({ shifts }) => {
  // Transform seedShifts to match react-big-calendar event format
  const events = shifts.map((shift, index) => {
    const startTime = moment(shift.start).toDate(); // Parse start time
    const endTime = moment(shift.end).toDate();     // Parse end time
    // Calendar Event
    return {
      title: (
          <Link to = {`/shift/${index}`} className='text-black'>
          {shift.employee}<br />
          Shift: {moment(startTime).format('h:mma')} - {moment(endTime).format('h:mma')} <br />
          Break: {shift.pause}
          </Link>
      ),
      start: startTime,
      end: endTime,
      key: index
    };
  });
//Calendar Render
  return (
    <div className='z-0'>
      <section>
        <h2 align='center'>Roster</h2>
        <Link to='/shift/new'>Add New Shift</Link>
      </section>
      <Calendar
        localizer={localizer}
        events={events}  // Use the transformed events
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }} // Set the calendar height
      />
    </div>
  );
};

export default Roster;
