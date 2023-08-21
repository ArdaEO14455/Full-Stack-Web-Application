import React from 'react'

const ViewEmployee = ({ employee }) => {
  return employee ? ( <>
    <div> Employee: {employee.name} </div>
    <div> Email: {employee.email} </div>
    <div> Phone Number: {employee.phone} </div>
    <div> DOB: {employee.dob} </div>
    <div> Wage: {employee.wage} </div>
    <div> Wage: {employee.contract} </div>
    </>
  ) : (
    <h4>Employee not Found!</h4>
  )
  
}

export default ViewEmployee