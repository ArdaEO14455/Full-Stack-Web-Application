import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


const EmployeeShifts = ({ employee, shifts }) => {
  // filtering through values and matching them to the shift id 
  const employeeShifts = shifts.filter(shift => shift.employee._id === employee._id)
  // usenavigate to redirect to the new page
  const navigate = useNavigate()
  // using the shift id to redirect edit shift page
  const goToEditShift = (shiftId) => {
    navigate(`/${shiftId}`)
  }
  return (
    <div>
      {employee ? (
        <div>
          <h2>{employee.name}'s Shifts:</h2>
          {employeeShifts.map((shift, index) => (
            <div key={index}>
              <h4> Date: {shift.startDate} - {shift.endDate}<br /></h4>
              <h5>Start Time: {moment(`${shift.date} ${shift.start}`, 'DD-MM-YYYY HH:mm').format('HH:mm')} <br /></h5>
              <h5>End Time: {moment(`${shift.date} ${shift.end}`, 'DD-MM-YYYY HH:mm').format('HH:mm')} <br /></h5>
              <h5>Break: {shift.pause} minutes</h5>
              <button type="button" onClick={() => goToEditShift(shift._id)} style={{ color: 'black' }} className="btn btn-primary mt-3 container-lg">Edit Shift</button>
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