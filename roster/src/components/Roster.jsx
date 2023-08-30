import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { add } from 'date-fns';

const localizer = momentLocalizer(moment);

const Roster = ({ shifts }) => {
  const [currentView, setCurrentView] = useState('month'); // Default view is month
  const [projectedWageExpense, setProjectedWageExpense] = useState(0); // Initialize with 0

  const handleRangeChange = (range, view) => {
    setCurrentView(view); // Update the current view
    calculateProjectedWageExpense(range, view); // Call the function to calculate projected wage expense
  };
  
  const calculateProjectedWageExpense = (range, view) => {
    let startDateRange;
    let endDateRange;
  
    // Calculate appropriate startDateRange and endDateRange based on the current view
    switch (view) {
      case 'month': //this returns an object with a 'start' property and an 'end' property, each a date object
        startDateRange = moment(range.start).startOf('month')._i;
        endDateRange = moment(range.end).endOf('month')._i;
        break;

      case 'week': //This returns its range as an array of 7 date objects instead of an object with just a 'start' and 'end' like the 'month' view
        startDateRange = moment(range.start).startOf('week')._d;
        endDateRange = moment(range.end).endOf('week')._d;
        break;

        
      case 'day': //similar to the 'week' view, this also returns an array, but containing just one date object for that day
        startDateRange = moment(range[0])._i;
        endDateRange = moment(add(new Date(range[0]), { days: 1 }))._i;
        break;

        default: //This case is applied when navigating using 'next' or 'previous'. Since each view returns a 'range' of different type (month -> object, week -> array of 7 dates, day -> array of 1 date), we need to apply different rule-sets based on the range type
          if (Array.isArray(range)) {
            if (range.length === 1) { //applied when the range is that of a day view
              // Handle 'day' view navigation
              startDateRange = moment(range[0]).startOf('day').toDate();
              endDateRange = moment(startDateRange).add(1, 'day').toDate();
            } else {  //applied when the range is that of a week view
              // Handle other view navigation
              startDateRange = moment(range[0]).startOf(view).toDate();
              endDateRange = moment(range[range.length - 1]).endOf(view).toDate();
            }
          } else { //applied when the range is that of a month
            startDateRange = range.start;
            endDateRange = range.end;
          }
          break;
    }
    console.log(startDateRange)
    console.log(endDateRange)
  
    const newProjectedWageExpense = shifts
      .filter((shift) => {
        const shiftStartDate = moment(shift.start);
        return shiftStartDate.isBetween(startDateRange, endDateRange, null, '[]');
      })
      .map((shift) => {
        const wage = 10; // Default wage if no employee
        const startTime = moment(shift.start);
        const endTime = moment(shift.end);
        const durationHours = endTime.diff(startTime, 'hours');
        return wage * durationHours;
      })
      .reduce((totalWage, shiftWage) => totalWage + shiftWage, 0);
  
    setProjectedWageExpense(newProjectedWageExpense); // Update the projected wage expense state
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

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
      
  });

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
        onView={(view) => setCurrentView(view)}
        // onView={handleRangeChange}
        // onRangeChange={console.log('RangeChange')}
        onRangeChange={handleRangeChange}
        // onNavigate={console.log('Navigate')}
        onNavigate={handleRangeChange}
        // onNavigate={(view) => handleRangeChange(view)}
      />
    </div>
  );
};

export default Roster;
