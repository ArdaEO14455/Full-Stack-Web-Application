import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Overview from './Overview'
import UpdateShift from './UpdateShift'
import ViewEmployee from './ViewEmployee'
import NavBar from './NavBar'
import Employees from './Employees'
import Roster from './Roster'
import NewEmployee from './NewEmployee'
import UpdateEmployee from './UpdateEmployee'
import EmployeePage from './EmployeePage'
import NewShift from './NewShift'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const navigate = useNavigate()

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
    const { id } = useParams();
    
    // Find the employee whose _id matches the id from the URL parameters
    const selectedEmployee = employees.find(emp => emp._id === id);
  
    return selectedEmployee 
    ? (
        <>
          <UpdateEmployee 
            employee={selectedEmployee} 
            updateEmployee={updateEmployee} 
            id={id} 
            handleDelete={handleDelete} 
          />
          <ViewEmployee employee={selectedEmployee} shifts={shifts} />
        </>
      ) 
    : <div>Loading...</div>

  }
  
  
  // Employee Creation
  const addEmployee = async (newEmployee) => {
    try {
        const response = await fetch('http://localhost:4001/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        })

        const responseBody = await response.json()

        if (response.ok) {
          setEmployees((prevEmployees) => [...prevEmployees, responseBody])
          toast.success("Employee was created!")
          navigate('/employees')
      } else { 
            console.error('Error adding employee. Status:', response.status, 'Response:', responseBody)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

  

  // Employee Updating
  const updateEmployee = async (employeeId, updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:4001/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      })
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error('Error updating data');
      } 
      // Update local state with the returned data from the server
      setEmployees(prevEmployees => {
        return prevEmployees.map(emp => emp._id === employeeId ? data : emp)
      })
        toast.success("Employee information was updated!")
        navigate('/employees')

    } catch (error) {
      console.error("Error:", error.message)
    }
  }
  

  // Deleting an employee
  const handleDelete = async (employeeId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this employee?")
    if (!userConfirmed) {
      return 
    }
    try {
      const response = await fetch(`http://localhost:4001/employees/${employeeId}`, {
        method: 'DELETE',
      })
      if (userConfirmed) {
        // removing the deleted employee from the state
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== employeeId))
        // displaying a message that employee was deleted with the toast library 
        toast.success("Employee was deleted!")
        // navigating to the employees page after the deletion
        navigate('/employees')
      } else {
        console.error("Error:", response.statusText)
      }       
    } catch (error) {
      console.error("Error:", error.message)
    }
  }
  

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

  function ShowShiftWrapper() {
    const { id } = useParams()
    const selectedShift = shifts.find(shift => shift._id == id)
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
        
        {/* Overview */}
        <Route path='/' element={<Overview employees={employees} shifts={shifts} />} />
        
        {/* Employees Routes */}
        <Route path='/employees' element={<Employees employees={employees}  />} />
          <Route path='/employees/new' element={<NewEmployee addEmployee={addEmployee} />}/>
          <Route path='/employee/:id' element={<EmployeePage employees={employees} shifts={shifts} updateEmployee={updateEmployee} handleDelete={handleDelete} />} />

        {/* <Route path='/employee/:id' element={<ShowEmployeeWrapper employees={employees} updateEmployee={updateEmployee} handleDelete = {handleDelete}/>} /> */}
        
        {/* Roster & Shift Paths */}
        <Route path='/roster' element={<Roster shifts={shifts} />} />
        <Route path='/roster/new' element={<NewShift addShift={addShift} employees={employees}/>} />
        <Route path='/roster/:id' element={<ShowShiftWrapper /> } />

        {/* Catch-all for invalid URLs */}
        <Route path='*' element= {<h3>Page Not Found</h3>} /> 
        
      </Routes>
      <ToastContainer />
  
  </> 
  )
}

export default App