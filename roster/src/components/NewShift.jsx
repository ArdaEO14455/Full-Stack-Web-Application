import React, { useState } from 'react'

const Newshift = ({ addShift }) => {
  const [employee, setEmployee] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [pause, setPause] = useState('');

  // Employee
  // Date
  // Shift Start
  // Shift End
  // Break

  const submit = (e) => {
    e.preventDefault();
    const newShift = {
      employee,
      date,
      start,
      end,
      pause,
    };
    console.log(newShift)
    addShift(newShift);
    // Reset form fields
    setEmployee('');
    setDate('');
    setStart('');
    setEnd('');
    setPause('');
  };
  
  
  return (<>
      
      {/* Header */}
      <h1 className="row justify-content-center">New shift Details</h1>
          <form className="container" onSubmit={submit}>
  
          {/* Employee Field */}
          <label for="exampleFormControlInput1" className="form-label">Select Employee</label>
              <input value={employee} onChange= {e => setEmployee(e.target.value)} className="form-control form-control-lg" type="text" placeholder="John Doe" aria-label=".form-control-lg example" required/>
          
          {/* Date Field */}
          <label for="exampleFormControlInput1" className="form-label">Date</label>
              <input value={date} onChange= {e => setDate(e.target.value)} className="form-control" type="date" placeholder="E.g.abc123@gmail.com" aria-label="default input example" required/>
          
          {/* Shift Start Field */}
          <label for="exampleFormControlInput1" className="form-label">Shift Start Time</label>
              <input value={start} onChange= {e => setStart(e.target.value)} className="form-control form-control-sm" type="time" placeholder="E.g. +61412123456" aria-label=".form-control-sm example" required/>
          
          {/* Shift End Field */}
          <label for="exampleFormControlInput1" className="form-label">Shift End Time</label>
              <input value={end} onChange= {e => setEnd(e.target.value)} className="form-control form-control-sm" type="time" placeholder="E.g. 01/01/2000" aria-label=".form-control-sm example" required/>
          
          {/* Break Field */}
          <label for="exampleFormControlInput1" className="form-label">Break (mins)</label>
              <input value={pause} onChange= {e => setPause(e.target.value)} className="form-control form-control-sm" type="number" placeholder="E.g. 30" aria-label=".form-control-sm example" default='0'/>

          
          
          {/* Submit Button*/}
          <button type="submit" className="btn btn-primary mt-3 container-lg">Add shift</button>
      </form>
    </>
    )
  }
 

export default Newshift