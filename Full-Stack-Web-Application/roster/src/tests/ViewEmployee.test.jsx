import React from 'react'
import { render, fireEvent  } from '@testing-library/react'
import { describe, expect } from 'vitest'
import ViewEmployee from '../components/ViewEmployee.jsx'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('ViewEmployee Component', () => {
  let container
  
    const mockEmployee = {
        name: "John Doe",
        _id: "12345"
    }
    
    const mockShifts = [{
        startDate: "01-01-2023",
        endDate: "01-01-2023",
        start: "09:00",
        end: "17:00",
        pause: 30,
        _id: "98765",
        employee: { _id: "12345" }
    }]

  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <ViewEmployee employee={mockEmployee} shifts={mockShifts}/>
      </MemoryRouter>
    ).container
  })

    test('Renders Employee name correctly', () => {
      expect(container.querySelector('h2')).not.toBeNull()
      expect(container.querySelector('h2')).toHaveTextContent("John Doe's Shifts:")
    })

    test('Renders Employee Shift details correctly', () => {
      expect(container.querySelector('h4')).not.toBeNull()
      expect(container.querySelector('h5')).not.toBeNull()
      expect(container.querySelector('h4')).toHaveTextContent('Date')
    })

    test('Edit Shift button works', () => {
        const editButton = container.querySelector("button")
        fireEvent.click(editButton)
    })
    
})
