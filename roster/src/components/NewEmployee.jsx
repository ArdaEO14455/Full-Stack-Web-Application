import React, { useState } from 'react';

const NewEmployee = ({ addEmployee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [wage, setWage] = useState('')
  const [contract, setContract] = useState('')

  const submit = (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      email,
      phone,
      dob,
      wage,
      contract
    };
    addEmployee(newEmployee);
    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setDob('');
    setWage('');
    setContract('')
  };
    
  return (
    <>
    {/* Header */}
    <h1 className="row justify-content-center">New Employee Details</h1>
        <form className="container" onSubmit={submit}>

        {/* Name Field */}
        <label for="exampleFormControlInput1" className="form-label">Name</label>
            <input value={name} onChange= {e => setName(e.target.value)} className="form-control form-control-lg" type="text" placeholder="John Doe" aria-label=".form-control-lg example" required/>
        
        {/* Email Field */}
        <label for="exampleFormControlInput1" className="form-label">Email address</label>
            <input value={email} onChange= {e => setEmail(e.target.value)} className="form-control" type="text" placeholder="E.g.abc123@gmail.com" aria-label="default input example"/>
        
        {/* Phone Field */}
        <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
            <input value={phone} onChange= {e => setPhone(e.target.value)} className="form-control form-control-sm" type="tel" placeholder="E.g. +61412123456" aria-label=".form-control-sm example"/>
        
        {/* DOB Field Field */}
        <label for="exampleFormControlInput1" className="form-label">Date of Birth</label>
            <input value={dob} onChange= {e => setDob(e.target.value)} className="form-control form-control-sm" type="date" placeholder="E.g. 01/01/2000" aria-label=".form-control-sm example"/>
        
        {/* Wage Field */}
        <label for="exampleFormControlInput1" className="form-label">Hourly Wage ($/Hr) </label>
            <input value={wage} onChange= {e => setWage(e.target.value)} className="form-control form-control-sm" type="number" placeholder="E.g. 30" aria-label=".form-control-sm example" required/>
        
        {/* Contract Field */}
        <label for="exampleFormControlInput1" className="form-label">Contract </label>
            <input value={contract} onChange= {e => setContract(e.target.value)} className="form-control form-control-sm" type="text" placeholder="E.g. Casual, Full-Time" aria-label=".form-control-sm example" />
        
        {/* Submit Button*/}
        <button type="submit" className="btn btn-primary mt-3 container-lg">Add Employee</button>
    </form>
  </>
  )
}

export default NewEmployee