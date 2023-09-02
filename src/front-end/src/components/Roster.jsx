import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { add } from 'date-fns'
import MediaQuery from 'react-responsive'
import './calendar.css'


const localizer = momentLocalizer(moment);

const Roster = ({ shifts, employees }) => {
  // Default view is month
  const [currentView, setCurrentView] = useState('week') 
  // Initialize with 0
  const [projectedWageExpense, setProjectedWageExpense] = useState(0)

  //Trigger expense projection calculation after shifts have loaded
  useEffect(() => {
    // pass through the placeholder range for the initialized component
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  
    const dummyRange = {
      start: startOfMonth,
      end: endOfMonth,
    }
  
    handleRangeChange(dummyRange, 'week')
  
    // Simulate clicking the 'month' view
    setCurrentView('week')
    //trigger handleRangeChange with the placeholder dates once a change in shifts is observed
  }, [shifts, employees]) 
  const handleRangeChange = (range, view) => {
    // Update the current view using useState so that react re-renders the page after view change
    setCurrentView(view)
    // Call the function to calculate projected wage expense 
    calculateProjectedWageExpense(range, view) 
  }
  
  //start projected wage expense calculation by defining the range in which the shifts are included
  const calculateProjectedWageExpense = (range, view) => {
    let startDateRange
    let endDateRange

    
  
    // Calculate appropriate startDateRange and endDateRange based on the current view
    switch (view) { //for reasons unbeknownst to me, each view has a differently formatted range 
       //this returns its range as an object with a 'start' property and an 'end' property, each a date object
      case 'month':
        startDateRange = moment(range.start).startOf('month')._i
        endDateRange = moment(range.end).endOf('month')._i
        break

      case 'week': //This returns its range as an array of 7 date objects instead of an object with just a 'start' and 'end' like the 'month' view
        startDateRange = moment(range.start).startOf('week')._d
        endDateRange = moment(range.end).endOf('week')._d
        break

       //similar to the 'week' view, this also returns an array, but containing just one date object for that day  
      case 'day':
        startDateRange = moment(range[0])._i
        endDateRange = moment(add(new Date(range[0]), { days: 1 }))._i
        break
        //This case is applied when navigating using 'next' or 'previous'. 
        // Since each view returns a 'range' of different type (month -> object, week -> array of 7 dates, day -> array of 1 date), 
        // we need to apply different rule-sets based on the range type
        default: 
          if (Array.isArray(range)) {
            //applied when the range is that of a day view
            if (range.length === 1) { 
              //call the first date object in the array
              startDateRange = moment(range[0]).startOf('day').toDate() 
              //manually add 24h to the start of the only date object to get the endDateRange
              endDateRange = moment(startDateRange).add(1, 'day').toDate() 
            } else {  //applied when the range is that of a week view
              //call the first date object in the array
              startDateRange = moment(range[0]).startOf(view).toDate() 
              //call the last date object in the arrray
              endDateRange = moment(range[range.length - 1]).endOf(view).toDate() 
            }
          //applied when the range is that of a month
          } else { 
            startDateRange = range.start
            endDateRange = range.end
          }
          break
    }
  
    const newProjectedWageExpense = shifts
      //filter shifts that are found between the defined range start and end
      .filter((shift) => { 
        const shiftStartDate = moment(shift.start)
        return shiftStartDate.isBetween(startDateRange, endDateRange, null, '[]')
      })
      .map((shift) => {
        const wage = shift.employee.wage
        //make the start and end times each a moment object
        const startTime = moment(shift.start)
        const endTime = moment(shift.end)
        const durationHours = endTime.diff(startTime, 'hours')
        return wage * durationHours
      })
      .reduce((totalWage, shiftWage) => totalWage + shiftWage, 0)
    // Update the projected wage expense state
    setProjectedWageExpense(newProjectedWageExpense) 
  }
  
  const events = shifts.map((shift) => {
    const start = moment(shift.start).toDate()
    const end = moment(shift.end).toDate()
    const employeeId = shift.employee._id ?
    // when reloaded, shifts will have their ID stored as their _id
     shift.employee._id 
    //newly created shifts will have their ID stored under shift.employee
     : shift.employee 
    //match each shift's employee ID to the id of the employee in the employees array
    const employee = employees.find((emp) => emp._id === employeeId)
    //set employeeName as the name.
    const employeeName = employee ? employee.name : 'Loading...' 

  
    
      return {
        //return each shift as an event in the calendar
        id: shift._id, 
        title: (
          <Link to={`/${shift._id}`} className='text-black'>
            {employeeName}<br />
            Shift: {shift.startTime} - {shift.endTime} <br />
            Break: {shift.pause} Minutes
          </Link>
        ),
        //define the start of the event by the start of the shift
        start: start,
        //define the end of the event by the end of the shift
        end: end, 
       //pass in the id of the shift as the unique event id
      
      } 
  })

  const views = ['week', 'day']
  
  // Calendar Object
  return (
    <div className='vh-100'>
      <section className="row bg-primary bg-opacity-50 align-items-center">
        <h1 className="row h1 fw-bold p-3 text-primary justify-content-center border-bottom border-4 border-primary">Roster</h1>
        <h2 data-testid="expense" className="col text-center text-primary fw-bold m-3">Projected Wage Expense: ${projectedWageExpense} </h2>
          <Link className="text-center text-primary fw-bold align-middle" to='/new'>
            <i data-testid="add" className="bi-plus-circle-fill fs-1 ">Add Shift</i>  
          </Link>
      </section>

 {/* Calendar View for */}
 <MediaQuery minWidth={1000}>
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    defaultView="month"
    onView={(view) => setCurrentView(view)}
    onRangeChange={handleRangeChange}
    onNavigate={handleRangeChange}
    popup // Enable popup for overflow events
    popupOffset={5} // Adjust the offset as needed
    maxEventSlots= {2}
  />

  </MediaQuery>
<MediaQuery maxWidth={1000}>
  <Calendar
    views={views}
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    defaultView="week"
    onView={(view) => setCurrentView(view)}
    onRangeChange={handleRangeChange}
    onNavigate={handleRangeChange}
    popup={true} // Enable popup for overflow events
    popupOffset={0} // Adjust the offset as needed
    eventOverlap="constrict" // Adjust the overlap behavior as needed
    maxEventSlots= {2}
  />
</MediaQuery>

    </div>
  )
}

export default Roster