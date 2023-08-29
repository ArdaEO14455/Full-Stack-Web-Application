import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
// import startOfDay from 'date-fns/startOfDay';
// import endOfDay from 'date-fns/endOfDay';
// import getHours from 'date-fns/getHours';
// import getMinutes from 'date-fns/getMinutes';
// import parseISO from 'date-fns/parseISO';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import moment from 'moment';


// Localizer setup
const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse: (value, formatString, _locale) => {
    // parsing the date according to the expected format
    return parse(value, 'dd-MM-yyyy', new Date())
},

  startOfWeek: () => 0,
  getDay: date => new Date(date).getDay(),
  locales
});

const Roster = ({ shifts }) => {
      const events = shifts.map((shift) => {
      const start = moment(shift.start).toDate(); // Parse start time
      const end = moment(shift.end).toDate();     // Parse end time


      
      const employeeName = shift.employee.name
      console.log(shift._id)
           
      return {
        title: (
          <Link to={`/roster/${shift._id}`} className='text-black'>
            {employeeName}<br />
            {/* Shift: {`${padNumber(getHours(startDate))}:${padNumber(getMinutes(startDate))}`} - {`${padNumber(getHours(endDate))}:${padNumber(getMinutes(endDate))}`} <br /> */}
            Shift: {shift.startTime} - {shift.endTime} <br />
            Break: {shift.pause}
          </Link>
        ),
        start: start,
        end: end,
        key: shift._id,
        
      };
      
  });

  return (
    <div className='z-0'>
      <section>
        <h2 align='center'>Roster</h2>
        <Link to='/roster/new'>Add New Shift</Link>
      </section>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
      />
    </div>
  );
};
export default Roster;
