import React from 'react'

const ViewShift = ({ shift }) => {
  return shift ? ( 
  <>
    <h5> Employee: {shift.employee}</h5>
    <h5> Date: {shift.startDate}</h5>
    <h4> Shift Start: {shift.startTime} </h4>
    <h4> Shift End: {shift.endTime} </h4>
    <h4> Break: {shift.pause} </h4>
    </>) : (
    <h4>Shift not Found!</h4>
  )

}

export default ViewShift