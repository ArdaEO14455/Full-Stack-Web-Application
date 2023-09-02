import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import UpdateEmployee from '../components/UpdateEmployee'

describe('UpdateEmployee Component', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Renders the component correctly', () => {
    const mockEmployee = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      dob: '01-01-1990',
      wage: '30',
      contract: 'Full-Time'
    }

    const mockUpdate = vi.fn()
    const mockDelete = vi.fn()

    const { getByPlaceholderText, getByLabelText } = render(
      <UpdateEmployee 
        employee={mockEmployee}
        updateEmployee={mockUpdate}
        id="1"
        handleDelete={mockDelete}
      />
    )

    expect(getByPlaceholderText('John Doe').value).toEqual(mockEmployee.name)
    expect(getByLabelText('Email').value).toEqual(mockEmployee.email)
    expect(getByLabelText('Phone').value).toEqual(mockEmployee.phone)
    expect(getByLabelText('Date of Birth').value).toEqual(mockEmployee.dob)
    expect(getByPlaceholderText('E.g. 30').value).toEqual(mockEmployee.wage)
    expect(getByLabelText('Contract').value).toEqual(mockEmployee.contract)
  })

  it('Should call UpdateEmployee when the form is submitted', () => {
    const mockEmployee = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      dob: '01-01-1990',
      wage: '30',
      contract: 'Full-Time'
    }
    const mockUpdateEmployee = vi.fn()
    const mockHandleDelete = vi.fn()

    const { getByText } = render(
      <UpdateEmployee 
        employee={mockEmployee}
        updateEmployee={mockUpdateEmployee}
        id="1"
        handleDelete={mockHandleDelete}
      />
    )

    fireEvent.click(getByText('Update Employee Details'))
    expect(mockUpdateEmployee).toHaveBeenCalledTimes(1)
  })

  it('Should called a handleDelete function when delete buttong is clicked', () => {
    const mockEmployee = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      dob: '01-01-1990',
      wage: '30',
      contract: 'Full-Time'
    }
    const mockUpdateEmployee = vi.fn()
    const mockHandleDelete = vi.fn()

    const { getByText } = render(
      <UpdateEmployee 
        employee={mockEmployee}
        updateEmployee={mockUpdateEmployee}
        id="1"
        handleDelete={mockHandleDelete}
      />
    )

    fireEvent.click(getByText('Delete Employee'))
    expect(mockHandleDelete).toHaveBeenCalledTimes(1)
  })
})


