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

const seedShifts = [
  {employee: "Test1", Date:"10/05/1997", start: "Test1", end: "Test1", pause: "Test1" },
  {employee: "Test2", Date:"10/05/1997", start: "Test2", end: "Test2", pause: "Test2" },
  {employee: "Test3", Date:"10/05/1997", start: "Test3", end: "Test3", pause: "Test3" }
]

const seedEmployees = [
  {name: "Test1", email:"10/05/1997", phone: "Test1", dob: "Test1", wage: "Test1", contract: "Full Time" },
  {name: "Test2", email:"10/05/1997", phone: "Test2", dob: "Test2", wage: "Test2", contract: "Full Time" },
  {name: "Test3", email:"10/05/1997", phone: "Test3", dob: "Test3", wage: "Test3", contract: "Full Time" },
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
        
        {/* Roster & Shifts Path */}
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