import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Overview from './Overview';
import UpdateShift from './UpdateShift';
import NavBar from './NavBar';
import Employees from './Employees';
import Roster from './Roster';
import NewEmployee from './NewEmployee';
import UpdateEmployee from './UpdateEmployee';
import Addshift from './NewShift';

// Seed Shift Data
const seedShifts =
[
  { employee: "Arda", startDate: "2023-08-24", startTime: "17:10", start: 'Thu Aug 24 2023 17:10:00 GMT+1000 (Australian Eastern Standard Time)', endDate: "2023-08-24", endTime: "22:00", end: 'Thu Aug 24 2023 22:00:00 GMT+1000 (Australian Eastern Standard Time', pause: "30" },
  { employee: "Arda", startDate: "2023-08-23", startTime: "17:10", start: 'Thu Aug 23 2023 17:10:00 GMT+1000 (Australian Eastern Standard Time)', endDate: "2023-08-23", endTime: "22:00", end: 'Thu Aug 23 2023 22:00:00 GMT+1000 (Australian Eastern Standard Time', pause: "30" },
  { employee: "Arda", startDate: "2023-08-25", startTime: "17:10", start: 'Thu Aug 25 2023 17:10:00 GMT+1000 (Australian Eastern Standard Time)', endDate: "2023-08-25", endTime: "22:00", end: 'Thu Aug 25 2023 22:00:00 GMT+1000 (Australian Eastern Standard Time', pause: "30" }
]

//Seed Employee Data
const seedEmployees = [
  {name: "Arda", email:"abc123@coderacademy.edu.au", phone: "0412391252", dob: "1997-05-10", wage: "Test1", contract: "Full Time" },
  {name: "Damira", email:"abc123@coderacademy.edu.au", phone: "0413597278", dob: "2001-07-27", wage: "Test2", contract: "Full Time" },
  {name: "Pixel", email:"abc123@coderacademy.edu.au", phone: "0413992960", dob: "1999-01-10", wage: "Test3", contract: "Full Time" },
]


const App = () => {

  // Employee Functions
  // Define useState for Employees here to allow access from Employees & NewEmployee Component
  const [employees, setEmployees] = useState(seedEmployees); //remove seedEmployees after testing

  // Allow Routes to Access ID variables from Employees
function ShowEmployeeWrapper() {
  const { id } = useParams()
  const employee_id = id
  const selectedEmployee = employees[id]
  return <UpdateEmployee employee={selectedEmployee} updateEmployee={updateEmployee} id={employee_id} />
}
  
  // Employee Creation
  const addEmployee = (newEmployee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
  };

  // Employee Updating
  const updateEmployee = (updatedEmployee) => {
    setEmployees((employees) => {
      return employees.map((employee, index) =>
        index == updatedEmployee.id ? updatedEmployee : employee
      );
    });
  };



// Shift Functions
  // Define useState for Shifts here to allow access by all other components
  const [shifts, setShifts] = useState(seedShifts); //remove seedShifts after testing

  // Allow Routes to Access ID variables from Shifts
function ShowShiftWrapper() {
  const { id } = useParams()
  const shift_id = id
  const selectedshift = shifts[id]
  return <UpdateShift shift={selectedshift} updateShift={updateShift} id={shift_id}/>
  }

  //Shift Creation
  const addShift = (newShift) => {
    setShifts(CurrentShifts => [...CurrentShifts, newShift]);
  };

  // Shift Updating
  const updateShift = (updatedShift) => {
    setShifts((shifts) => {
      return shifts.map((shift, index) =>
        index == updatedShift.id ? updatedShift : shift
      );
    });
  };






// Routes
  return (
    <>
      <NavBar />
      <Routes>
        
        {/* Overview */}
        <Route path='/' element={<Overview />} />
        
        {/* Employees Routes */}
        <Route path='/employees' element={<Employees employees={employees}  />} />
          <Route path='/employee/new' element={<NewEmployee addEmployee={addEmployee} />}/>
        <Route path='/employee/:id' element={<ShowEmployeeWrapper employees={employees} updateEmployee={updateEmployee}/>} />
        
        {/* Roster & Shift Paths */}
        <Route path='/roster' element={<Roster shifts={shifts} />} />
        <Route path='/shift/new' element={<Addshift addShift={addShift}/>} />
        <Route path='/shift/:id' element={<ShowShiftWrapper shifts={shifts} updateShift={updateShift}/> } />

        {/* Catch-all for invalid URLs */}
        <Route path='*' element= {<h3>Page Not Found</h3>} /> 
        
      </Routes>
    
  
  </> 
  )
}

export default App