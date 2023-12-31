import React from 'react'
import { render, fireEvent  } from '@testing-library/react'
import { describe, expect } from 'vitest'
import EmployeeShifts from '../components/EmployeeShifts.jsx'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('EmployeeShifts Component', () => {
  let container
  
    const newEmployee = {
        name: "John Doe",
        _id: "12345",
        wage: 26,
        contract: "Casual"
    }
    
    const newShifts = [{
        startDate: "01-01-2023",
        endDate: "01-01-2023",
        start: "09:00",
        end: "17:00",
        pause: 30,
        _id: "98765",
        employee: newEmployee
    }]

  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <EmployeeShifts employee={newEmployee} shifts={newShifts}/>
      </MemoryRouter>
    ).container
  })

    test('Renders Employee name correctly', () => {
      expect(container.querySelector('h1')).not.toBeNull()
      expect(container.querySelector('h1')).toHaveTextContent("John Doe's Shifts:")
    })

    test('Renders Employee Shift details correctly', () => {
      expect(container.querySelector('h5')).not.toBeNull()
      expect(container.querySelector('h5')).toHaveTextContent('Date')
    })
    
})
