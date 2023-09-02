import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import UpdateEmployee from '../components/UpdateEmployee'

describe('UpdateEmployee Component', () => {

  const buttonUpdate = vi.fn()
  const buttonDelete = vi.fn()

  const newEmployee = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    dob: '01-01-1990',
    wage: '30',
    contract: 'Full-Time'
  }

  beforeEach(() => {
    vi.restoreAllMocks()

    render(
      <UpdateEmployee 
        employee={newEmployee}
        updateEmployee={buttonUpdate}
        id="1"
        handleDelete={buttonDelete}
      />
    )
  })
  
  it('Renders the component correctly', () => {
    expect(screen.getByPlaceholderText('John Doe').value).toEqual(newEmployee.name)
    expect(screen.getByLabelText('Email').value).toEqual(newEmployee.email)
    expect(screen.getByLabelText('Phone').value).toEqual(newEmployee.phone)
    expect(screen.getByLabelText('Date of Birth').value).toEqual(newEmployee.dob)
    expect(screen.getByPlaceholderText('E.g. 30').value).toEqual(newEmployee.wage)
    expect(screen.getByLabelText('Contract').value).toEqual(newEmployee.contract)
  })

  it('Should call UpdateEmployee when the form is submitted', () => {
    fireEvent.click(screen.getByText('Update Employee Details'))
    expect(buttonUpdate).toHaveBeenCalledTimes(1)
  })

  it('Should call a handleDelete function when delete button is clicked', () => {
    fireEvent.click(screen.getByText('Delete Employee'))
    expect(buttonDelete).toHaveBeenCalledTimes(1)
  })
})