import React from 'react';
import { Link } from 'react-router-dom';

const Employees = ({ employees }) => {
  return (
    <>
      <h3>Employees</h3>
      <Link to='/employees/new'>Add New Employee</Link>
      {/* Display existing employees */}
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            <h4><Link to={`/employee/${index}`}>{employee.name}</Link></h4>
            <ul>
              <li>Email: {employee.email}</li>
              <li>Phone: {employee.phone}</li>
              <li>Date of Birth: {employee.dob}</li>
              <li>Hourly Wage ($/Hr): {employee.wage}</li>
              <li>Contract: {employee.contract}</li>
            </ul>
          </li>
        ))}
      </ul>
            
    </>
  );
}

export default Employees;