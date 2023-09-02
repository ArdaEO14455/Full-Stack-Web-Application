import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NewEmployee from '../components/NewEmployee.jsx'
import '@testing-library/jest-dom'

describe('NewEmployee Component', () => {
  let createEmployee
  let wasCalled = false

  beforeEach(() => {
    wasCalled = false
    createEmployee = () => {
      wasCalled = true
    }
  })

  it('Submitting new employee details', () => {
    const { getByPlaceholderText, getByText, container } = render(<NewEmployee addEmployee={createEmployee} />)

    fireEvent.change(getByPlaceholderText("John Doe"), { target: { value: 'John' } })
    fireEvent.change(getByPlaceholderText("E.g.abc123@gmail.com"), { target: { value: 'john@gmail.com' } })
    fireEvent.change(getByPlaceholderText("E.g. +61412123456"), { target: { value: '+61412123456' } })
    fireEvent.change(getByPlaceholderText("E.g. 01-01-2000"), { target: { value: '01-01-2000' } })
    fireEvent.change(getByPlaceholderText("E.g. 30"), { target: { value: '30' } })

    const selectContract = getByText("Select a contract type").closest('select')
    fireEvent.change(selectContract, { target: { value: 'Full-Time' } })

    const form = container.querySelector('form')
    fireEvent.submit(form)

    expect(wasCalled).toBe(true)
  })
})


