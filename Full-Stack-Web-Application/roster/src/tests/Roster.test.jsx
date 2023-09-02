import React from 'react'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'
import Roster from '../components/Roster'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('Roster Component', () => {
 
let container

const mockEmployee = { _id:'123',  name: 'John', email:'john@gmail.com', wage: 20, contract: 'Full-time' }

const employees = [mockEmployee]

const mockShifts = [
  {
    _id: "1",
    employee: "123",
    startDate: '2023-08-29',
    startTime: '17:00',
    start: '2023-08-29T17:00:00.000Z',
    endDate:'2023-08-29',
    endTime: '23:00',
    end: '2023-08-29T23:00:00.000Z',
    pause: 60
  }
]

beforeEach(() => {
  container = render(
    <MemoryRouter>
    <Roster
      shifts =  { mockShifts }
      employees = { employees }
    />
    </MemoryRouter>).container
})

  test('should display the calendar with shifts properly', () => {

    // Check if calendar renders
    const calendarElement = screen.getByText('Roster')
    expect(calendarElement).toBeInTheDocument()

    // // Check if the mock shift is displayed on the calendar
    // const shiftElement = screen.getByText('John Doe')
    // expect(shiftElement).toBeInTheDocument()

    // // Check if the start and end time for the shift is displayed
    // const startTimeElement = screen.getByText('Shift: 08:00 - 17:00');
    // expect(startTimeElement).toBeInTheDocument()

    // // Check if the projected wage is displayed correctly
    // const projectedWageElement = screen.getByText('Projected Wage Expense: $270');
    // expect(projectedWageElement).toBeInTheDocument()
  })

}) 

