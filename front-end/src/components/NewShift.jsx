import React, { useState } from 'react'
import moment from 'moment'

const NewShift = ({ addShift, employees }) => {


  const [employee, setEmployee] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [pause, setPause] = useState('')

  const submit = (e) => {
    e.preventDefault()

    // // Combine date and time for start and end
    const start = moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate()

    // // If the end time is on the next day, add one day to the end date
    const end = moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate()
   
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
    addShift(newShift)

setEmployee('')
setStartDate('')
setStartTime('')
setEndDate('')
setEndTime('')
setPause('')

  };

  return (
    <>
      <div className="vh-100 bg-primary bg-opacity-50">
      <h1 className="row justify-content-center p-4"
      >New Shift Details</h1>
      <form className="container" onSubmit={submit}
      >
        {/* Employee Field */}
      
      <select className="d-block form-select bg-primary-subtle text-center" aria-label="Default select example" required value={employee._id} onChange={event => setEmployee(event.target.value) }>
      <option selected value='' >Select Employee</option>
        {
          employees.map((employee) => {
            return <option key={employee._id} value={employee._id}>{employee.name}</option>
            
          })
        }
      </select>

          
        {/* Shift Start */}
        <label for="startTimeInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold" >Shift Start</label>
        {/* Start Date */}
        <input
            id="dateInput"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="form-control bg-primary-subtle text-center"
            type="date"
            required
          />
        {/* Start Time */}
        <input
          id="startTimeInput"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          className="mt-2 form-control form-control-sm bg-primary-subtle text-center"
          type="time"
          required
        />
        {/* Shift End Field */}
        {/* End Date */}
        <label for="endTimeInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Shift End</label>
        <input
                  id="dateInput"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="form-control bg-primary-subtle text-center"
                  type="date"
                  required
        />
        {/* End Time */}
        <input
          id="endTimeInput"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          className="mt-2 form-control form-control-sm bg-primary-subtle text-center"
          type="time"
          required
        />

        {/* Break Field */}
        <label for="exampleFormControlInput1" className="h4 row justify-content-center form-label text-decoration-underline fw-bold">Break (mins)</label>
          <input 
          value={pause} 
          onChange= {e => setPause(e.target.value)} 
          className="form-control form-control-sm bg-primary-subtle text-center" 
          type="number" 
          placeholder="E.g. 30" 
          aria-label=".form-control-sm example" 
          />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3 container-lg">Add shift</button>
      </form>
      
    </div>
    </>
  );
};

export default NewShift;