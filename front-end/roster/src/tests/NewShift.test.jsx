import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NewShift from '../components/NewShift'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

describe('NewShift component', () => {

  let container 

  const myMockFunction = vi.fn()

  const fakeEmployees = [
    { _id: '456', name: 'John Doe', wage: 30, contract: 'Full-time' },
    { _id: '789', name: 'Jane Smith', wage: 25, contract: 'Part-time' }
  ]
  
  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <NewShift
         addShift={myMockFunction} 
         employees={fakeEmployees}
        />
      </MemoryRouter>
    ).container
  })

  it('Renders the New Shift Component with the form for users input', () => {
    expect(screen.getByText('New Shift Details')).toBeInTheDocument()
    expect(screen.getByText('Shift Start')).toBeInTheDocument()
    expect(screen.getByText('Shift End')).toBeInTheDocument()
    expect(screen.getByText('Break (mins)')).toBeInTheDocument()
    expect(screen.getByText('Add shift')).toBeInTheDocument()
  })

  it('Allows the input of the data', () => {

    const chooseEmployee = screen.getByLabelText("Default select example")
    fireEvent.change(chooseEmployee, { target: { value: '456' } })
    
    const startDateInput = screen.getByLabelText(/Shift Start/).closest('input')
    fireEvent.change(startDateInput, { target: { value: '2022-09-01' } })

    const startTimeInput = screen.getByLabelText(/Shift Start/i).closest('input[type="time"]')
    fireEvent.change(startTimeInput, { target: { value: '09:00' } })

    const endDateInput = screen.getByLabelText(/Shift End/).closest('input')
    fireEvent.change(endDateInput, { target: { value: '2022-09-02' } })

    const endTimeInput = screen.getByLabelText(/Shift End/i).closest('input[type="time"]')
    fireEvent.change(endTimeInput, { target: { value: '17:00' } })

    const breakInput = screen.getByPlaceholderText(/E.g. 30/)
    fireEvent.change(breakInput, { target: { value: '30' } })

    const submitButton = screen.getByText(/Add shift/i)
    fireEvent.click(submitButton)

  })
})
