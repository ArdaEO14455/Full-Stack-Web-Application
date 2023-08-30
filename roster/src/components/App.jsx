import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import UpdateShift from './UpdateShift';
import NavBar from './NavBar';
import Employees from './Employees';
import Roster from './Roster';
import NewEmployee from './NewEmployee';
import UpdateEmployee from './UpdateEmployee';
import NewShift from './NewShift';


const App = () => {
  const nav = useNavigate()
  const reload = () => {window.location.reload()}

  // Employee Functions
  // Define useState for Employees here to allow access from Employees & NewEmployee Component
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4001/employees")
      const data = await res.json()
      setEmployees(data)
    })()
  }, [])

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
  }

  // Employee Updating
  const updateEmployee = (updatedEmployee) => {
    setEmployees((employees) => {
      return employees.map((employee, index) =>
        index === updatedEmployee.id ? updatedEmployee : employee
      );
    });
  };



// Shift Functions
  // Define useState for Shifts here to allow access by all other components
  const [shifts, setShifts] = useState([]); //remove seedShifts after testing

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4001/roster")
      const data = await res.json()
      setShifts(data)
    })()
  }, [])

  // Allow Routes to Access ID variables from Shifts
function ShowShiftWrapper() {
  const { id } = useParams()
  const selectedShift = shifts.find(shift => shift._id == id)
  // console.log(selectedShift)
 return selectedShift ? (<UpdateShift employees= {employees} shift={selectedShift} updateShift={updateShift} deleteShift={deleteShift}/>
  ): (<div>Loading...</div>)
}

  //Shift Creation
  async function addShift( { employee, startDate, startTime, start, endDate, endTime, end, pause }) {
    // const id = shifts.length
    // Add a new entry
      const returnedShift= await fetch('http://localhost:4001/roster/new', {
        method: 'POST',
        body: JSON.stringify({ employee, startDate, startTime, start, endDate, endTime, end, pause }),
        headers: { "Content-Type": "application/json" }
      })
      
      setShifts([...shifts, await returnedShift.json()])
      nav("/roster/")
      reload()
    
    }
  // Shift Update
  async function updateShift(updatedShift) {
    const response = await fetch(`http://localhost:4001/roster/${updatedShift._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedShift),
        headers: { "Content-Type": "application/json" }
      });
      
        const updatedShiftData = await response.json();
        setShifts((prevShifts) =>
          prevShifts.map((shift) =>
            shift._id == updatedShiftData._id ? updatedShiftData : shift
          )
        )
        nav("/roster/")
        reload()
      }
// Shift Delete
      const deleteShift = async (shift) => {
        console.log(shift)
        if (window.confirm('Are you sure you want to delete this shift?')) {
          try {
            await fetch(`http://localhost:4001/roster/${shift._id}`, {
              method: 'DELETE',
            });
            setShifts([shifts])
            nav("/roster/")
            reload()
          } catch (error) {
            console.error('Error deleting shift:', error);
          }
        }
      };

// Routes
  return (
    <>
      <NavBar />
      <Routes>
        
        {/* Employees Routes */}
        <Route path='/employees' element={<Employees employees={employees}  />} />
          <Route path='/employees/new' element={<NewEmployee addEmployee={addEmployee} />}/>
        <Route path='/employees/:id' element={<ShowEmployeeWrapper />} />
        
        {/* Roster & Shift Paths */}
        <Route path='/roster' element={<Roster shifts={shifts} />} />
        <Route path='/roster/new' element={<NewShift addShift={addShift} employees={employees}/>} />
        <Route path='/roster/:id' element={<ShowShiftWrapper /> } />

        {/* Catch-all for invalid URLs */}
        <Route path='*' element= {<h3>Page Not Found</h3>} /> 
        
      </Routes>
    
  
  </> 
  
)}

export default App