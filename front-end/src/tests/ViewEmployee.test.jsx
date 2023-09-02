import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ViewEmployee from '../components/ViewEmployee.jsx'
import '@testing-library/jest-dom'

describe('ViewEmployee Component', () => {

  const updateEmployee = vi.fn()
  const handleDelete = vi.fn()
  
  const newEmployees = [{
    name: "John Doe",
    _id: "123", 
    wage: 30,
    contract: 'Casual'
  }]

  const newShifts = [{
    startDate: "01-01-2023",
    endDate: "01-01-2023",
    start: "09:00",
    end: "17:00",
    pause: 30,
    _id: "98765",
    employee: newEmployees[0]
  }]


  beforeEach(async () => {
   render(
      <MemoryRouter>
        <ViewEmployee
          employees={newEmployees} 
          shifts={newShifts}
          updateEmployee={updateEmployee}
          handleDelete={handleDelete}
          employeeId="123"
        />
      </MemoryRouter>
    )
  })

  test('Renders the employee details header correctly', async () => {
    const { getByText } = render(ViewEmployee)
    expect(getByText('John Doe Details')).toBeVisible()
  })
  
  test('Renders the correct initial input values', async () => {
    const { getByPlaceholderText, getByLabelText } = render(ViewEmployee)
    expect(getByPlaceholderText('John Doe').value).toBe('John Doe')
    expect(getByLabelText('Email').value).toBe('')
    expect(getByLabelText('Phone').value).toBe('')
    expect(getByLabelText('Date of Birth').value).toBe('')
  })
  
  test('Renders shift details for the employee', async () => {
    const { getByText } = render(ViewEmployee)
    expect(getByText("John Doe's Shifts:")).toBeVisible()
    expect(getByText("Date: 01-01-2023")).toBeVisible()
    expect(getByText("Break: 30 minutes")).toBeVisible()
  })
})


