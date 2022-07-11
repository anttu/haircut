import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('renders date selection buttons', () => {
    render(<App />)
    const previousDateButton = screen.getByLabelText(/previous date/i, { selector: 'button' })
    expect(previousDateButton).toBeInTheDocument()

    const nextDateButton = screen.getByLabelText(/next date/i, { selector: 'button' })
    expect(nextDateButton).toBeInTheDocument()
})
