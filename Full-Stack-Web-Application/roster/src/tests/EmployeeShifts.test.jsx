import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import EmployeeShifts from '../components/EmployeeShifts.jsx'
import '@testing-library/jest-dom'

describe('EmployeeShifts Component', () => {
  const mockEmployees = [{
    name: "John Doe",
    _id: "12345"
  }]

  const mockShifts = [{
    startDate: "01-01-2023",
    endDate: "01-01-2023",
    start: "09:00",
    end: "17:00",
    pause: 30,
    _id: "98765",
    employee: { _id: "12345" }
  }];

  const mockUpdateEmployee = () => {};
  const mockHandleDelete = () => {};

  let container

  beforeEach(() => {
    container = render(
      <MemoryRouter >
          <EmployeeShifts
            employees={mockEmployees} 
            shifts={mockShifts}
            updateEmployee={mockUpdateEmployee}
            handleDelete={mockHandleDelete}
          />
      </MemoryRouter>
    ).container
  })

  test('Renders both components correctly', () => {
    const components = container.querySelector('div')  
    expect(components).not.toBeNull()
  })
})

