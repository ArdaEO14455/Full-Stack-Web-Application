import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect } from 'vitest'
import UpdateShift from '../components/UpdateShift.jsx'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('UpdateShift Component', () => {

  let container

  const updateShift = () => {}
  const deleteShift = () => {}

  const newEmployees = [
    { _id: "101", name: "Alice", wage: 30, contract: 'Full-time' },
    { _id: "102", name: "Bob", wage: 20, contract: 'Part-time' }
  ]

  const newShift = {
    _id: "1",
    employee: newEmployees[0],
    startDate: "2023-01-01",
    startTime: "09:00",
    endDate: "2023-01-01",
    endTime: "17:00",
    pause: 30
  }

  beforeEach(() => {
    container = render(
      <MemoryRouter>
      <UpdateShift 
        shift={newShift} 
        updateShift={updateShift} 
        employees={newEmployees} 
        deleteShift={deleteShift} 
      />
      </MemoryRouter>).container
    
  })

  test('Renders the employee name correctly', () => {
    expect(screen.getByText(`Employee: ${newShift.employee.name}`)).toBeInTheDocument()
  })

  test('Renders the shift date correctly', () => {
    expect(screen.getByText(`Date: ${newShift.startDate}`)).toBeInTheDocument()
  })

  test('"Update Shift" button exists and can be clicked', () => {
    const updateButton = screen.getByText('Update Shift')
    fireEvent.click(updateButton)
  })

  test('"Delete Shift" button exists and can be clicked', () => {
    const deleteButton = screen.getByText('Delete Shift')
    fireEvent.click(deleteButton)
  })
})
