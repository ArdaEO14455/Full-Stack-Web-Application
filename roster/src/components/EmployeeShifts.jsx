import React from 'react'
import { useParams } from 'react-router-dom'
import UpdateEmployee from './UpdateEmployee'
import ViewEmployee from './ViewEmployee'

function EmployeeShifts({ employees, shifts, updateEmployee, handleDelete }) {
  // extracting id from the parameters
  const { id } = useParams()
  // matching the id to the id from employees in the array
  const selectedEmployee = employees.find(emp => emp._id === id)
  
  return selectedEmployee 
    ? (<>
      <div className="container-fluid">
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
          <ViewEmployee employee={selectedEmployee} shifts={shifts} />
        </div>
      </div>
    </div>
    </> )
    : <div>Loading...</div>
}

export default EmployeeShifts
