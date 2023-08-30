import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import parseISO from 'date-fns/parseISO';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'

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

      const events = shifts.map((shift, index) => {
      const startDate = parse(`${shift.date} ${shift.start}`, 'dd-MM-yyyy HH:mm', new Date());
      const endDate = parse(`${shift.date} ${shift.end}`, 'dd-MM-yyyy HH:mm', new Date());
      

      function padNumber(num) {
        return num < 10 ? `0${num}` : `${num}`
      }
           
      return {
        title: (
          <Link to={`/shift/${index}`} className='text-black'>
            {shift.employee.name}<br />
            Shift: {`${padNumber(getHours(startDate))}:${padNumber(getMinutes(startDate))}`} - {`${padNumber(getHours(endDate))}:${padNumber(getMinutes(endDate))}`} <br />
            Break: {shift.pause}
          </Link>
        ),
        start: startDate,
        end: endDate,
        key: index
      };
      
  });

  return (
    <div className='z-0'>
      <section>
        <h2 align='center'>Roster</h2>
        <Link to='/shift/new'>Add New Shift</Link>
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
