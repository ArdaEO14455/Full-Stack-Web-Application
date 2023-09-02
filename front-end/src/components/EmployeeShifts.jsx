import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


const EmployeeShifts = ({ employee, shifts }) => {
  const employeeShifts = shifts.filter(shift => shift.employee._id === employee._id)
  const navigate = useNavigate()
  const goToEditShift = (shiftId) => {
    navigate(`/${shiftId}`)
  }
  return (
    <div className="p-3 h-100 bg-primary bg-opacity-50">
      {employee ? (
        <div>
          <h1 className="text-center">{employee.name}'s Shifts:</h1>
          {employeeShifts.map((shift, index) => (
            <div key={index} type="button" onClick={() => goToEditShift(shift._id)} className="m-3 row btn btn-outline-info d-lg-flex justify-content-between text-dark col border-end border-dark">
              <h5 className='col fw-bold'> Date: <br /> {shift.startDate}</h5>
              <h5 className='col'>Start Time: <br />{shift.startTime} </h5>
              <h5 className='col'>End Time: <br />{shift.endTime}</h5>
              <h5 className='col'>Break: <br />{shift.pause} minutes</h5>
            </div>
          ))}
        </div>
      ) : (
        <h4>Employee not Found!</h4>
      )}
    </div>
  )
}

export default EmployeeShifts