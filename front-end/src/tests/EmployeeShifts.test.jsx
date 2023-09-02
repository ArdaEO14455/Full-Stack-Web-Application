import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import EmployeeShifts from '../components/EmployeeShifts.jsx'
import '@testing-library/jest-dom'

describe('EmployeeShifts Component', () => {
  const newEmployees = [{
    name: "John Doe",
    _id: "12345"
  }]

  const newShifts = [{
    startDate: "01-01-2023",
    endDate: "01-01-2023",
    start: "09:00",
    end: "17:00",
    pause: 30,
    _id: "98765",
    employee: { _id: "12345" }
  }];

  const updateEmployee = () => {};
  const handleDelete = () => {};

  let container

  beforeEach(() => {
    container = render(
      <MemoryRouter >
          <EmployeeShifts
            employees={newEmployees} 
            shifts={newShifts}
            updateEmployee={updateEmployee}
            handleDelete={handleDelete}
          />
      </MemoryRouter>
    ).container
  })

  test('Renders both components correctly', () => {
    const components = container.querySelector('div')  
    expect(components).not.toBeNull()
  })
})

