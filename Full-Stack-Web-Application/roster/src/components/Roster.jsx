import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';


const localizer = momentLocalizer(moment);

const Roster = ({ shifts }) => {
  const projectedWageExpense = shifts
    .map((shift) => {
      const wage = 10; // Default wage if no employee
      const startTime = moment(shift.start);
      const endTime = moment(shift.end);
      const durationHours = endTime.diff(startTime, 'hours');

    console.log("Duration:", durationHours);
      console.log(wage * durationHours)
      return wage * durationHours;
    })
    .reduce((totalWage, shiftWage) => totalWage + shiftWage, 0);
  

      const events = shifts.map((shift) => {
      const start = moment(shift.start).toDate(); // Parse start time
      const end = moment(shift.end).toDate();     // Parse end time
      const employeeName = shift.employee ? shift.employee.name : 'Loading...'
      // const employeeName = shift.employee.name
 
      return {
        title: (
          <Link to={`/roster/${shift._id}`} className='text-black'>
            {employeeName}<br />
            Shift: {shift.startTime} - {shift.endTime} <br />
            Break: {shift.pause}
          </Link>
        ),
        start: start,
        end: end,
        key: shift._id,      
      }   
  })
  return (
    <div className='z-0'>
      <section>
        <h2 align='center'>Roster</h2>
        <Link to='/roster/new'>Add New Shift</Link>
        <h2 align='center'>Projected Wage Expense: ${projectedWageExpense} </h2>
      </section>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        key = {[shifts]}
      />
    </div>
  );
};
export default Roster