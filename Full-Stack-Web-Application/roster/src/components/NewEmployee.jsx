import React, { useState } from 'react'



const NewEmployee = ({ addEmployee }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [wage, setWage] = useState('')
  const [contract, setContract] = useState('')



  const submit = (e) => {
    // formatting the date to a dd-mm-yyyy format
    const [year, month, day] = dob.split("-")
    const formattedDob = `${day}-${month}-${year}`

    e.preventDefault()
    // creating a new employee object
    const newEmployee = {
      name,
      email,
      phone,
      dob: formattedDob,
      wage,
      contract
    }


    addEmployee(newEmployee)
    // Reset form fields
    setName('')
    setEmail('')
    setPhone('')
    setDob('')
    setWage('')
    setContract('')
}
  return (
    <>
    {/* Header */}
    <h1 className="row justify-content-center">New Employee Details</h1>
        <form className="container" onSubmit={submit}>


    {/* Name Field */}
    <label htmlFor="nameInput" className="form-label">Name</label>
    <input id="nameInput" value={name} onChange={e => setName(e.target.value)} 
      className="form-control form-control-lg" 
      type="text" 
      placeholder="John Doe" 
      required />

    {/* Email Field */}
    <label htmlFor="emailInput" className="form-label">Email address</label>
    <input id="emailInput" value={email} onChange={e => setEmail(e.target.value)} 
      className="form-control" 
      type="email" 
      placeholder="E.g.abc123@gmail.com" 
      required/>

    {/* Phone Field */}
    <label htmlFor="phoneInput" className="form-label">Phone Number</label>
    <input id="phoneInput" value={phone} onChange={e => setPhone(e.target.value)} 
      className="form-control form-control-sm" 
      type="tel" 
      placeholder="E.g. +61412123456"
      required />

    {/* DOB Field */}
    <label htmlFor="dobInput" className="form-label">Date of Birth</label>
    <input id="dobInput" value={dob} onChange={e => setDob(e.target.value)} 
      className="form-control form-control-sm" 
      type="date" 
      placeholder="E.g. 01-01-2000"
      required />

    {/* Wage Field */}
    <label htmlFor="wageInput" className="form-label">Hourly Wage ($/Hr)</label>
    <input id="wageInput" value={wage} onChange={e => setWage(e.target.value)} 
      className="form-control form-control-sm"
      type="number"
      placeholder="E.g. 30"
      min = "0"
      required />

    {/* Contract Field */}
    <label htmlFor="contractInput" className="form-label">Contract</label>
    <select
      id="contractInput"
      value={contract}
      onChange={e => setContract(e.target.value)}
      className="form-control form-control-sm"
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
  </>
  )
}

export default NewEmployee