import React, { useState, } from 'react'
import moment from 'moment';


const UpdateShift = ({ shift, updateShift, id} ) => {
  const [employee, setEmployee] = useState(shift.employee);
  const [startDate, setStartDate] = useState(shift.startDate);
  const [startTime, setStartTime] = useState(shift.startTime);
  const [endDate, setEndDate] = useState(shift.endDate);
  const [endTime, setEndTime] = useState(shift.endTime);
  const [pause, setPause] = useState(shift.pause);


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

    const updatedShift = {
      id,
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
    updateShift(updatedShift);
    

    // Reset form fields
  //   setEmployee('');
  //   setStartDate('');
  //   setEndDate('');
  //   setStartTime('');
  //   setEndTime('');
  //   setPause('');
  };
  
  
  return shift ? ( 
  <>
    <h5> Employee: {shift.employee}</h5>
    <h5> Date: {shift.startDate}</h5>
    <h4> Shift Start: {shift.startTime} </h4>
    <h4> Shift End: {shift.endTime} </h4>
    <h4> Break: {shift.pause} </h4>


    <h1 className="row justify-content-center"
      >Edit Shift</h1>
      <form className="container" 
      onSubmit={submit}
      >
        {/* Employee Field */}
        <label for="exampleFormControlInput1" className="form-label">Select Employee</label>
          <input 
          value= {employee}
          onChange= {e => setEmployee(e.target.value)} 
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


        {/* Shift End Fields */}
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
        <button type="submit" className="btn btn-primary mt-3 container-lg">Update Shift</button>
      </form>










    </>) : (
    <h4>Shift not Found!</h4>
  )

}

export default UpdateShift