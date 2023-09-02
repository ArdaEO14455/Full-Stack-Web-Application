import React from 'react'
import { Link } from 'react-router-dom'


const Employees = ({ employees }) => {
  return (
    <>
    <div className="vh-100 bg-primary bg-opacity-50">
      <h1  className="row h1 fw-bold p-3 text-primary justify-content-center border-bottom border-4 border-primary">Employees</h1>

      <Link className="row text-center text-primary fw-bold align-middle" to='/employees/new'>
      <i class="bi-plus-circle-fill fs-1 ">New Employee</i>  
      </Link>

     <div className="m-3">
    <table className="table table-striped table-secondary ">
      {/* Table Headers */}
  <thead>
    <tr>
      <th className="text-center"scope="col">Name</th>
      <th className="d-none d-sm-table-cell" scope="col">Email</th>
      <th className="d-none d-sm-table-cell" scope="col">Phone</th>
      <th className="d-none d-sm-table-cell" scope="col">DOB</th>
      <th className="d-none d-sm-table-cell" scope="col">Wage</th>
      <th className="d-none d-sm-table-cell" scope="col">Contract</th>
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
  {employees.map((employee) => (
    <tr key={employee._id}>
      <td className="text-center"><Link to={`/employees/${employee._id}`}>{employee.name}</Link></td>
      <td className="d-none d-sm-table-cell">{employee.email}</td>
      <td className="d-none d-sm-table-cell">{employee.phone}</td>
      <td className="d-none d-sm-table-cell">{employee.dob}</td>
      <td className="d-none d-sm-table-cell">${employee.wage}/hr</td>
      <td className="d-none d-sm-table-cell">{employee.contract}</td>
    </tr>
  ))}
</tbody>

</table> 
</div> 
</div>       
    </>
  )
}

export default Employees