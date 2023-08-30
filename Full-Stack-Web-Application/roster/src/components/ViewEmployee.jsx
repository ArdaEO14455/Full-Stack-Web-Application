import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment)

const ViewEmployee = ({ employee, shifts }) => {
  // filtering shifts so they match the selected employee
  const employeeShifts = shifts.filter(shift => shift.employee._id === employee._id);


  const events = employeeShifts.map(shift => {
    return {
      title: `${employee.name}'s Shift`,
      start: new Date(shift.startDate),
      end: new Date(shift.endDate),
      break: new Date(shift.pause)
    };
  });

  return employee ? (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </>
  ) : (
    <h4>Employee not Found!</h4>
  );
};

export default ViewEmployee;
