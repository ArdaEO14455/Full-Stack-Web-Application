import React, { useState } from 'react';
import { parse, format, addDays } from 'date-fns';

const UpdateShift = ({ shift, updateShift, employees }) => {
  const [employee, setEmployee] = useState(shift.employee);
  const [startDate, setStartDate] = useState(shift.startDate);
  const [startTime, setStartTime] = useState(shift.startTime);
  const [endDate, setEndDate] = useState(shift.endDate);
  const [endTime, setEndTime] = useState(shift.endTime);
  const [pause, setPause] = useState(shift.pause);

  const submit = (e) => {
    e.preventDefault();

    const start = parse(`${startDate} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date());

    let end = parse(`${endDate} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date());
    if (end < start) {
      end = addDays(end, 1);
    }

    const updatedShift = {
      _id: shift._id,
      employee,
      startDate,
      startTime,
      start,
      endDate,
      endTime,
      end,
      pause,
    };
    updateShift(updatedShift);
    

    // Reset form fields
    // setEmployee('');
    // setStartDate('');
    // setEndDate('');
    // setStartTime('');
    // setEndTime('');
    // setPause('');
  };

  return shift ? (
    <>
      <h5> Employee: {shift.employee.name}</h5>
      <h5> Date: {shift.startDate}</h5>
      <h4> Shift Start: {shift.startTime} </h4>
      <h4> Shift End: {shift.endTime} </h4>
      <h4> Break: {shift.pause} </h4>

      <h1 className="row justify-content-center">Edit Shift</h1>
      <form className="container" onSubmit={submit}>
        {/* Employee Field */}
        <select className="d-block form-select" aria-label="Default select example" required value={employee._id} onChange={event => setEmployee(event.target.value) }>
      <option selected>Select Employee</option>
        {
          employees.map((employee) => {
            return <option key={employee._id} value={employee._id}>{employee.name}</option>
            
          })
        }
      </select>

        {/* Shift Start */}
        <label htmlFor="startTimeInput" className="form-label">
          Shift Start
        </label>
        {/* Start Date */}
        <input
          id="dateInput"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
          type="date"
          required
        />
        {/* Start Time */}
        <input
          id="startTimeInput"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="form-control form-control-sm"
          type="time"
          required
        />

        {/* Shift End Fields */}
        {/* End Date */}
        <label htmlFor="endTimeInput" className="form-label">
          Shift End
        </label>
        <input
          id="dateInput"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
          type="date"
          required
        />
        {/* End Time */}
        <input
          id="endTimeInput"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="form-control form-control-sm"
          type="time"
          required
        />

        {/* Break Field */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Break (mins)
        </label>
        <input
          value={pause}
          onChange={(e) => setPause(e.target.value)}
          className="form-control form-control-sm"
          type="number"
          placeholder="E.g. 30"
          min = "0"
          aria-label=".form-control-sm example"
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3 container-lg">
          Update Shift
        </button>
      </form>
    </>
  ) : (
    <h4>Shift not found</h4>
  );
};

export default UpdateShift;
