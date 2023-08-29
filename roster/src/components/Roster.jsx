import React, { useState } from 'react';
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
      case 'month':
        startDateRange = moment(range.start).startOf('month');
        endDateRange = moment(range.end).endOf('month');
        break;
      case 'week':
        startDateRange = moment(range.start).startOf('week');
        endDateRange = moment(range.end).endOf('week');
        break;
      case 'day':
        startDateRange = moment(range.start).startOf('day');
        endDateRange = moment(range.end).endOf('day');
        break;
      default:
        // Handle other views if needed
        startDateRange = moment(range.start);
        endDateRange = moment(range.end);
        break;
    }
    console.log(startDateRange._d)
    console.log(endDateRange._d)
    
    const newProjectedWageExpense = shifts
      .filter((shift) => {
        const shiftStartDate = moment(shift.start);
        return shiftStartDate.isBetween(startDateRange._d, endDateRange._d, null, '[]');
      })
      .map((shift) => {
        const wage = 10; // Default wage if no employee
        const startTime = moment(shift.start);
        const endTime = moment(shift.end);
        const durationHours = endTime.diff(startTime, 'hours');
        console.log(wage)
        console.log(durationHours)
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
        onRangeChange={handleRangeChange}
        onNavigate={handleRangeChange}
      />
    </div>
  );
};

export default Roster;
