import React, { useState } from 'react';
import moment from 'moment';

const NewShift = ({ addShift }) => {
  const [employee, setEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [pause, setPause] = useState('');

  const submit = (e) => {
    e.preventDefault();

    // Combine date and time for start and end
    const start = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate();

    // If the end time is on the next day, add one day to the end date
    let end = moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm');
    if (moment(end).isBefore(start)) {
      end.add(1, 'day');
    }
    end = end.toDate();

    const newShift = {
      employee,
      // Start Details
      startDate,
      startTime,
      start,
      // End Details
      endDate,
      endTime,
      end,
      //Break
      pause,
    };
    addShift(newShift);
    console.log(newShift)

    // Reset form fields
  //   setEmployee('');
  //   setStartDate('');
  //   setEndDate('');
  //   setStartTime('');
  //   setEndTime('');
  //   setPause('');
  };

  return (
    <>
      <h1 className="row justify-content-center"
      >New shift Details</h1>
      <form className="container" 
      onSubmit={submit}
      >
        {/* Employee Field */}
        <label for="exampleFormControlInput1" className="form-label">Select Employee</label>
          <input 
          value={employee} onChange= {e => setEmployee(e.target.value)} 
          className="form-control form-control-lg" 
          type="text" 
          placeholder="John Doe" 
          aria-label=".form-control-lg example" 
          required 
          />
          
        {/* Shift Start */}
        <label for="startTimeInput" className="form-label">Shift Start</label>
        {/* Start Date */}
        <input
            id="dateInput"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="form-control"
            type="date"
            required
          />
        {/* Start Time */}
        <input
          id="startTimeInput"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          className="form-control form-control-sm"
          type="time"
          required
        />
        {/* Shift End Field */}
        {/* End Date */}
        <label for="endTimeInput" className="form-label">Shift End</label>
        <input
                  id="dateInput"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="form-control"
                  type="date"
                  required
        />
        {/* End Time */}
        <input
          id="endTimeInput"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          className="form-control form-control-sm"
          type="time"
          required
        />

        {/* Break Field */}
        <label for="exampleFormControlInput1" className="form-label">Break (mins)</label>
          <input 
          value={pause} 
          onChange= {e => setPause(e.target.value)} 
          className="form-control form-control-sm" 
          type="number" 
          placeholder="E.g. 30" 
          aria-label=".form-control-sm example" 
          />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3 container-lg">Add shift</button>
      </form>
    </>
  );
};

export default NewShift;
