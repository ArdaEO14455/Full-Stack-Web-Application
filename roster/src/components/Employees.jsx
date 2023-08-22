import React from 'react';
import { Link } from 'react-router-dom';

const Employees = ({ employees }) => {
  return (
    <>
      <h1 align='center'>Employees</h1>
      
    <table className="table table-striped table-primary table-hover">
      {/* Table Headers */}
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">DOB</th>
      <th scope="col">Wage</th>
      <th scope="col">Contract</th>
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
  {employees.map((employee, index) => (
    <tr>
      <th scope="row">{index}</th>
      <td><Link to={`/employee/${index}`}>{employee.name}</Link></td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.dob}</td>
      <td>{employee.wage}</td>
      <td>{employee.contract}</td>
      </tr>
     ))}
    
    
  </tbody>
</table>        
    </>
  );
}

export default Employees;