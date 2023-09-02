import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Employees from "../components/Employees.jsx"
import '@testing-library/jest-dom'

describe('Employee Component', () => {
  let container

  // mocking employee objects for testing purposes
  const forTesting = [{ _id: "1", name: "John Doe", email: "john@example.com", phone: "1234567890", wage: 25, contract: "Full-time" },
                      { _id: "2", name: "Jane Smith", email: "jane@example.com",dob: "03-12-1990", phone: "987654321", wage:30, contract: "Part-time" }]
  
  // render the employees component before each test
  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <Employees employees={forTesting}/>
      </MemoryRouter>
    ).container
  })

  it('Renders the Employee Page Component', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(container.querySelector('h1')).toHaveTextContent('Employees')
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
