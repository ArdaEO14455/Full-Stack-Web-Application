import React, { useState, } from 'react'

const UpdateEmployee = ({ employee, updateEmployee, id} ) => {

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone);
  const [dob, setDob] = useState(employee.dob);
  const [wage, setWage] = useState(employee.wage)
  const [contract, setContract] = useState(employee.contract)


  const submit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      id,
      name,
      // Start Details
      email,
      phone,
      dob,
      wage,
      contract
    };
    updateEmployee(updatedEmployee);
    
      // Reset form fields
      // setName('');
      // setEmail('');
      // setPhone('');
      // setDob('');
      // setWage('');
      // setContract('')
   
  };
  
  
  return employee ? ( 
  <>
    <h1 className="row justify-content-center"
      >{employee.name} Details</h1>
      <form className="container" 
      onSubmit={submit}
      >
        {/* Name*/}
        <label for="exampleFormControlInput1" className="form-label">Employee Name</label>
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
        <label for="startTimeInput" className="form-label">Email</label>
        <input
            id="dateInput"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            type="text"
            required
          />

        {/* Phone */}
        <label for="endTimeInput" className="form-label">Phone</label>
        <input
                  id="dateInput"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="form-control"
                  type="tel"
                  required
        />
        {/* Date of Birth */}

        <label for="endTimeInput" className="form-label">Date of Birth</label>
        <input
          id="endTimeInput"
          value={dob}
          onChange={e => setDob(e.target.value)}
          className="form-control form-control-sm"
          type="date"
          required
        />

        {/* Break Field */}
        <label for="exampleFormControlInput1" className="form-label">Wage</label>
          <input 
          value={wage} 
          onChange= {e => setWage(e.target.value)} 
          className="form-control form-control-sm" 
          type="number" 
          placeholder="E.g. 30" 
          aria-label=".form-control-sm example" 
          />


<label for="exampleFormControlInput1" className="form-label">Contract</label>
          <input 
          value={contract} 
          onChange= {e => setContract(e.target.value)} 
          className="form-control form-control-sm" 
          type="Text" 
          placeholder="E.g. 30" 
          aria-label=".form-control-sm example" 
          />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3 container-lg">Update Employee Details</button>
      </form>










    </>) : (
    <h4>Employee not Found!</h4>
  )

}

export default UpdateEmployee