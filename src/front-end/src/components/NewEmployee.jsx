import React, { useState } from 'react'


// setting the state of employee object properties
const NewEmployee = ({ addEmployee }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [wage, setWage] = useState('')
  const [contract, setContract] = useState('')

  // function that handles submit event
  const submit = (e) => {

    e.preventDefault()

    // creating a new employee object
    const newEmployee = {
      name,
      email,
      phone,
      wage,
      contract
    }
  // if dob has a value, set dob property to newEmployee
    if (dob) {
      newEmployee.dob = dob
    }
    // adding new employee to the database
    addEmployee(newEmployee)

    // Reset form fields
    setName('')
    setEmail('')
    setPhone('')
    setDob('')
    setWage('')
    setContract('')
}

// formatting dob as it is being entered
const handleDOBInputChange = (value) => {
  if (value.length === 2 || value.length === 5) {
    // adding '-' after 2 or 5 characters
    setDob(value + '-')
  } else {
    setDob(value)
  }
}
  return (
    <>
    <div className="vh-100 bg-primary bg-opacity-50">
    {/* Header */}
    <h2 className="row justify-content-center p-4">New Employee Details</h2>
        <form className="container" onSubmit={submit}>


    {/* Name Field */}
    <label htmlFor="nameInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Name</label>
    <input id="nameInput" value={name} onChange={e => setName(e.target.value)} 
      className="form-control form-control-sm bg-primary-subtle text-center"  
      type="text" 
      placeholder="John Doe" 
      required />

    {/* Email Field */}
    <label htmlFor="emailInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Email address</label>
    <input id="emailInput" value={email} onChange={e => setEmail(e.target.value)} 
      className="form-control form-control-sm bg-primary-subtle text-center" 
      type="email" 
      placeholder="E.g.abc123@gmail.com" />

    {/* Phone Field */}
    <label htmlFor="phoneInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Phone Number</label>
    <input id="phoneInput" value={phone} onChange={e => setPhone(e.target.value)} 
      className="form-control form-control-sm bg-primary-subtle text-center"  
      type="tel" 
      placeholder="E.g. +61412123456" />

    {/* DOB Field */}
    <label htmlFor="dobInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Date of Birth</label>
    <input id="dobInput" value={dob} onChange={e => handleDOBInputChange(e.target.value)}
      className="form-control form-control-sm bg-primary-subtle text-center"  
      type="text" 
      placeholder="E.g. 01-01-2000" />

    {/* Wage Field */}
    <label htmlFor="wageInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Hourly Wage ($/Hr)</label>
    <input id="wageInput" value={wage} onChange={e => setWage(e.target.value)} 
      className="form-control form-control-sm bg-primary-subtle text-center" 
      type="number"
      placeholder="E.g. 30"
      min = "0"
      required />

    {/* Contract Field */}
    <label htmlFor="contractInput" className="h4 row justify-content-center mt-1 form-label text-decoration-underline fw-bold">Contract</label>
    <select
      id="contractInput"
      value={contract}
      onChange={e => setContract(e.target.value)}
      className="form-control form-control-sm bg-primary-subtle text-center" 
      required
      >
      <option value="" disabled>Select a contract type</option>
      <option value="Full-Time">Full-Time</option>
      <option value="Part-Time">Part-Time</option>
      <option value="Casual">Casual</option>
    </select>

    {/* Submit Button */}
    <button type="submit" className="btn btn-primary mt-3 container-lg">Add Employee</button>

    </form>
    </div>
  </>
  )
}

export default NewEmployee