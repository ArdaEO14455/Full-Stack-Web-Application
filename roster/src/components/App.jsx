import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Overview from './Overview';
import ViewShift from './ViewShift';
import NavBar from './NavBar';
import Employees from './Employees';
import Roster from './Roster';
import NewEmployee from './NewEmployee';
import ViewEmployee from './ViewEmployee';
import Addshift from './NewShift';


const seedShifts =
[
  { index: 0, employee: "Arda", startDate: "2023-08-24", startTime: "17:10", start: 'Thu Aug 24 2023 17:10:00 GMT+1000 (Australian Eastern Standard Time', endDate: "2023-08-24", endTime: "22:00", end: 'Thu Aug 24 2023 22:00:00 GMT+1000 (Australian Eastern Standard Time', pause: "30" }
]

//Seed Employee Data
const seedEmployees = [
  {name: "Arda", email:"abc123@coderacademy.edu.au", phone: "0412391252", dob: "10/05/1997", wage: "Test1", contract: "Full Time" },
  {name: "Damira", email:"abc123@coderacademy.edu.au", phone: "0413597278", dob: "20/07/2001", wage: "Test2", contract: "Full Time" },
  {name: "Pixel", email:"abc123@coderacademy.edu.au", phone: "0413992960", dob: "11/01/1999", wage: "Test3", contract: "Full Time" },
]


const App = () => {

  // Define useState for Employees here to allow access from Employees & NewEmployee Component
  const [employees, setEmployees] = useState(seedEmployees); //remove seedEmployees after testing

  const addEmployee = (newEmployee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
  };

  // Define useState for Shifts here to allow access by all other components
  const [shifts, setShifts] = useState(seedShifts); //remove seedShifts after testing

  const addShift = (newShift) => {
    setShifts(CurrentShifts => [...CurrentShifts, newShift]);
  };


// ALlow Routes to Access ID variables from Shifts & Employees
function ShowShiftWrapper() {
  const { id } = useParams()
  return <ViewShift shift={shifts[id]}/>
}
function ShowEmployeeWrapper() {
  const { id } = useParams()
  return <ViewEmployee employee={employees[id]}/>
}


  return (
    <>
      <NavBar />
      <Routes>
        
        {/* Overview */}
        <Route path='/' element={<Overview />} />
        
        {/* Employees Routes */}
        <Route path='/employees' element={<Employees employees={employees}  />} />
          <Route path='/employees/new' element={<NewEmployee addEmployee={addEmployee} />}/>
        <Route path='/employee/:id' element={<ShowEmployeeWrapper />} />
        
        {/* Roster & Shift Paths */}
        <Route path='/roster' element={<Roster shifts={shifts} />} />
        <Route path='/shift/new' element={<Addshift addShift={addShift}/>} />
        <Route path='/shift/:id' element={<ShowShiftWrapper /> } />

        {/* Catch-all for invalid URLs */}
        <Route path='*' element= {<h3>Page Not Found</h3>} /> 
        
      </Routes>
    
  
  </> 
  )
}

export default App