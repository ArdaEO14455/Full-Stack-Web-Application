import React, { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import UpdateShift from './UpdateShift'
import NavBar from './NavBar'
import Employees from './Employees'
import Roster from './Roster'
import NewEmployee from './NewEmployee'
import ViewEmployee from './ViewEmployee'
import NewShift from './NewShift'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// initiating the app 
const App = () => {
  // navigating to routes with a useNavigate hook
  const navigate = useNavigate()

  // Employee Functions
  // useState to track the state and update the state of the employee object
  const [employees, setEmployees] = useState([])

  // fetching the 
  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/employees`)
      const data = await res.json()
      setEmployees(data)
    })()
  }, [])

  // Employee Creation
  const addEmployee = async (newEmployee) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        })
        const responseBody = await response.json()
        if (response.ok) {
          // adding new employee to the objects array
          setEmployees((prevEmployees) => [...prevEmployees, responseBody])
          // displaying a success message to the user
          toast.success("Employee was created!")
          // navigating to the employees page
          navigate('/employees')
      } else { 
          console.error("Error:", response.statusText)
        }
    } catch(error) {
        console.error('Error:', error)
    }
}

  // Employee Updating
  const updateEmployee = async (employeeId, updatedEmployee) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      })
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error('Error updating data')
      } 
      // update local state with the returned data from the server
      setEmployees(prevEmployees => {
        return prevEmployees.map(emp => emp._id === employeeId ? data : emp)
      })
      // display a success message to the user
        toast.success("Employee information was updated!")
        // redirect to the employees page
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
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/employees/${employeeId}`, {
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
  
// Shift functions
  const [shifts, setShifts] = useState([]) //remove seedShifts after testing

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/`)
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
    
    // Add a new entry
    const newShift = { employee, startDate, startTime, start, endDate, endTime, end, pause }
      const returnedShift= await fetch(`${import.meta.env.VITE_API_HOST}/new`, {
        method: 'POST',
        body: JSON.stringify(newShift),
        headers: { "Content-Type": "application/json" }
      })
      
      toast.success("Shift was created!")
      navigate("/")
      setShifts([...shifts, await returnedShift.json()])  
  }

  // Shift Update
  async function updateShift(updatedShift) {
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/${updatedShift._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedShift),
        headers: { "Content-Type": "application/json" }
      })     
        const updatedShiftData = await response.json();
        setShifts((prevShifts) =>
          prevShifts.map((shift) =>
            shift._id == updatedShiftData._id ? updatedShiftData : shift
          )
        )
        toast.success("Shift Was Updated!")
        navigate("/")     
  }
// Shift Delete
  const deleteShift = async (shift) => {
    console.log(shift)
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_HOST}/${shift._id}`, {
          method: 'DELETE',
        })
        setShifts((prevShifts) => prevShifts.filter((s) => s._id !== shift._id));
        toast.success("Shift Deleted")
        navigate("/")     
      } catch (error) {
        console.error('Error deleting shift:', error)
      }
    }
  }
  
// Routes
  return (
  <>
      <NavBar />
      <Routes>
        
        {/* Employees Routes */}
        <Route path='/employees' element={<Employees employees={employees}  />} />
          <Route path='/employees/new' element={<NewEmployee addEmployee={addEmployee} />}/>
          <Route path='/employees/:id' element={<ViewEmployee employees={employees} shifts={shifts} updateEmployee={updateEmployee} handleDelete={handleDelete} />} />
        
        {/* Roster & Shift Paths */}
        <Route path='/' element={<Roster shifts={shifts} employees={employees} />} />
        <Route path='/new' element={<NewShift addShift={addShift} employees={employees}/>} />
        <Route path='/:id' element={<ShowShiftWrapper /> } />

        {/* Catch-all for invalid URLs */}
        <Route path='*' element= {<h3>Page Not Found</h3>} /> 
       
      </Routes>
      <ToastContainer />  
  </> 
  )
}

export default App