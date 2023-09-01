import React, { useState } from 'react';
import { parse, addDays } from 'date-fns';

const UpdateShift = ({ shift, updateShift, employees, deleteShift }) => {
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
    console.log(updatedShift)
    updateShift(updatedShift);
  };

  const shiftDelete = (e) => {
    e.preventDefault();
    deleteShift(shift)
  }


  return shift ? (
    <>
    <div className="vh-100 bg-primary bg-opacity-50">
      <h1 className="row justify-content-center p-4">Edit Shift</h1>
      <form className="container" onSubmit={submit}>
        {/* Employee Field */}
        <select className="d-block form-select bg-primary-subtle text-center" required value={employee._id} onChange={event => setEmployee(event.target.value) }>
        {
          employees.map((employee) => {
            return <option key={employee._id} value={employee._id}>{employee.name}</option>
            
          })
        }
      </select>

        {/* Shift Start */}
        <label htmlFor="startTimeInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">
          Shift Start
        </label>
        {/* Start Date */}
        <input
          id="dateInput"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control bg-primary-subtle text-center"
          type="date"
          required
        />
        {/* Start Time */}
        <input
          id="startTimeInput"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="form-control bg-primary-subtle text-center"
          type="time"
          required
        />

        {/* Shift End Fields */}
        {/* End Date */}
        <label htmlFor="endTimeInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">
          Shift End
        </label>
        <input
          id="dateInput"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control bg-primary-subtle text-center"
          type="date"
          required
        />
        {/* End Time */}
        <input
          id="endTimeInput"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="form-control bg-primary-subtle text-center"
          type="time"
          required
        />

        {/* Break Field */}
        <label htmlFor="exampleFormControlInput1" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">
          Break (mins)
        </label>
        <input
          value={pause}
          onChange={(e) => setPause(e.target.value)}
          className="form-control bg-primary-subtle text-center"
          type="number"
          placeholder="E.g. 30"
          min = "0"
          aria-label=".form-control-sm example"
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3 container-lg">
          Update Shift
        </button>
        {/* Delete Button */}
        <button onClick={shiftDelete} className="btn btn-danger mt-3 container-lg" align="center">
          Delete Shift
        </button> 
      </form>
      
    </div>      
    </>
  ) : (
    <h4>Shift not found</h4>
  );
};

export default UpdateShift;
