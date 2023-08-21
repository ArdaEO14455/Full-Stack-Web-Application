import React from 'react'
import { Link } from 'react-router-dom';

const Roster = ({ shifts }) => {
  return ( <>
    <h3>Roster</h3>
      <Link to='/shift/new'>Add New Shift</Link>
      <ul>
        
        {shifts.map((shift, index) => (
          <li key={index}>
            <h4><Link to={`/shift/${index}`}>{shift.employee}</Link></h4>
            <ul>
                <li>Date: {shift.date}</li>
                <li>Shift Start Time: {shift.start}</li>
                <li>Shift End Time: {shift.end}</li>
                <li>Break: {shift.pause}</li>
            </ul>
    
          </li>
        ))}
      </ul>

  </>)
}


export default Roster


