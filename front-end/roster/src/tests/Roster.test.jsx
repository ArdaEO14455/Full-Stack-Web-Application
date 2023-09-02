import React from 'react';
import { describe, vi, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Roster from '../components/Roster';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


describe('Roster Component', () => {

  let container

  vi.mock('react-responsive', () => {
    return {
      __esModule: true,
      default: ({ children }) => <div>{children}</div> 
    }
  })

  const mockEmployee = [
    {
      _id: '123',
      name: 'John',
      email: 'john@gmail.com',
      wage: 20,
      contract: 'Full-time'
    }
  ]

  const mockShifts = [
    {
      _id: '1',
      employee: mockEmployee[0],
      startDate: '2023-08-29',
      startTime: '17:00',
      endDate: '2023-08-29',
      endTime: '23:00',
      pause: 60
    }
  ]

  beforeEach(() => {
   container = render(
      <MemoryRouter>
        <Roster shifts={mockShifts} employees={mockEmployee} />
      </MemoryRouter>     
    ).container
  })

  test('Renders the Roster component header', () => {
    const heading = container.querySelector('h1')
    expect(heading).toHaveTextContent('Roster')
  })

  test('Element with data-testid "add" is rendered', () => {
    const wageExpenseElement = screen.getByTestId('add')
    expect(wageExpenseElement).toHaveTextContent('Add Shift')
})

  test('Renders the month header', () => {
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
  })

  test('Shows the calendar controls', () => {
    const todayElements = screen.getAllByText('Today')
    expect(todayElements[0]).toBeInTheDocument()
  })
})
