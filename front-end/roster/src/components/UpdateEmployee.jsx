import React, { useState } from 'react'

// passing employee, updateEmployee, id, handleDelete to the component
const UpdateEmployee = ({ employee, updateEmployee, id, handleDelete} ) => {

  // setting the state of each property to the original value
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [phone, setPhone] = useState(employee.phone)
  const [dob, setDob] = useState(employee.dob)
  const [wage, setWage] = useState(employee.wage)
  const [contract, setContract] = useState(employee.contract)

// on submit
  const submit = (e) => {
    e.preventDefault()
    // convert the outcoming data to the appropriate format for the backend
    const convertDateToBackendFormat = (dateStr) => {
      const [day, month, year] = dateStr.split("-")
      return `${year}-${month}-${day}`
    }
    // if the dob was specified, convert it, otherwise send null instead
    const formattedDOB = dob ? convertDateToBackendFormat(dob) : null
    // setting the employee object with new data
    const updatedEmployee = {
      name,
      dob: formattedDOB,
      email,
      phone,
      wage,
      contract
    }
  
  updateEmployee(id, updatedEmployee)
    
  }
  // when delete buttong is clicked
  const onDeleteClick = (e) => {
    e.preventDefault()
    // use the handledelete function to remove the employee
    handleDelete(id)
    }
// formatting the date of birth string 
const handleDOBInputChange = (value) => {
  if (value.length === 2 || value.length === 5) {
    setDob(value + '-')
  } else {
    setDob(value)
  }
}
// if employee exists
  return employee ? ( 
  // return the form 
  <>
    <h1 className="row justify-content-center"
      >{employee.name} Details</h1>
      <form className="container" 
      onSubmit={submit}
      >
        {/* Name*/}
      <label htmlFor="exampleFormControlInput1" className="form-label">Employee Name</label>
        <input 
        value= {name}
        onChange= {e => setName(e.target.value)} 
        className="form-control form-control-lg" 
        type="text" 
        placeholder="John Doe" 
        aria-label=".form-control-lg example" 
        required 
          />
          
        {/* Email */}
      <label htmlFor="emailInput" className="form-label">Email</label>
      <input
        id="emailInput"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="form-control"
        type="text"
          />

        {/* Phone */}
      <label htmlFor="phoneInput" className="form-label">Phone</label>
      <input
        id="phoneInput"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="form-control"
        type="tel"
        />

        {/* Date of Birth */}
      <label htmlFor="dobInput" className="form-label">Date of Birth</label>
      <input
          id="dobInput"
          value={dob}
          onChange={e => handleDOBInputChange(e.target.value)}
          className="form-control form-control-sm"
          type="text"
          placeholder = "dd-MM-yyyy"
        />

        {/* Break Field */}
      <label htmlFor="exampleFormControlInput1" className="form-label">Wage</label>
        <input 
          value={wage} 
          onChange= {e => setWage(e.target.value)} 
          className="form-control form-control-sm" 
          type="number" 
          placeholder="E.g. 30" 
          aria-label=".form-control-sm example" 
          />

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
        <button type="submit" style = {{ color: 'black'}} className="btn btn-primary mt-3 container-lg">Update Employee Details</button>
        <button  type="button" onClick={ onDeleteClick } style = {{ backgroundColor: 'red', color: 'black'}} className="btn btn-primary mt-3 container-lg">Delete Employee</button>
      </form>
    </>) : (
    <h4>Employee not Found!</h4>
  )

}

export default UpdateEmployee