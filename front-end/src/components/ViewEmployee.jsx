import React from 'react'
import { useParams } from 'react-router-dom'
import UpdateEmployee from './UpdateEmployee'
import EmployeeShifts from './EmployeeShifts'

function ViewEmployee({ employees, shifts, updateEmployee, handleDelete, employeeId }) {
  // extracting id from the parameters
  const { id } = useParams()
  const effectiveId = employeeId || id;
  // matching the id to the id from employees in the array
  const selectedEmployee = employees.find(emp => emp._id === effectiveId)
  
  return selectedEmployee 
    ? (<>
      <div className="vh-100 bg-primary bg-opacity-50 container-fluid">
      <div className="row">
        <div className="col-md-6">
          <UpdateEmployee 
            employee={selectedEmployee} 
            updateEmployee={updateEmployee} 
            id={id} 
            handleDelete={handleDelete} 
          />
          </div>
          <div className="col-md-6">
          <EmployeeShifts employee={selectedEmployee} shifts={shifts} />
        </div>
      </div>
    </div>
    </> )
    : <div>Loading...</div>
}

export default ViewEmployee

