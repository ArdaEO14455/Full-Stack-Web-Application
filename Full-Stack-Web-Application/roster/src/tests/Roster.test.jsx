import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import Roster from '../components/Roster.jsx';
import '@testing-library/jest-dom';

describe('Roster Component', () => {
  const mockShifts = [{
    _id: "115",
    start: "2023-01-01T09:00:00",
    end: "2023-01-01T17:00:00",
    employee: {
      name: "John Doe",
      wage: 30,
      contract: "Full-time"
    },
    pause: 30
  }];

  let container;

  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <Roster shifts={mockShifts} />
      </MemoryRouter>
    ).container;
  });

  test('Renders the roster component correctly', () => {
    const projectedWageExpense = container.querySelector('.text-primary.fw-bold.m-3');
    const addShiftLink = container.querySelector('.text-primary.fw-bold.align-middle');

    const expectedWageExpense = mockShifts[0].employee.wage * 8; // Calculate expected wage expense
    expect(projectedWageExpense).toHaveTextContent(`Projected Wage Expense: $${expectedWageExpense}`);
    expect(addShiftLink).toHaveTextContent('Add Shift');
  });

  test('Renders calendar events correctly', () => {
    const calendar = container.querySelector('.rbc-calendar');
    expect(calendar).not.toBeNull();
    // Additional assertions about calendar events can be added here
  });
});
