import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TitleStyles from './TitlesStyles';

describe('TitleStyles component', () => {
  test('renders the label and data correctly', () => {
    const label = 'Label Example'
    const data = 'Data Example'

    render(<TitleStyles label={label} data={data} />)

    const labelElement = screen.getByText(label)
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveTextContent(label)

    const dataElement = screen.getByText(data)
    expect(dataElement).toBeInTheDocument()
    expect(dataElement).toHaveTextContent(data)
  })

  test('applies the correct styles to the label and data', () => {
    const label = 'Styled Label'
    const data = 'Styled Data'

    render(<TitleStyles label={label} data={data} />)

    const labelElement = screen.getByText(label)
    const dataElement = screen.getByText(data)

    expect(labelElement).toHaveClass('font-extrabold', 'text-gray-400', 'italic', 'text-base', 'max-sm:text-xs')
    expect(dataElement).toHaveClass('font-extrabold', 'text-slate-200', 'italic', 'text-xl', 'max-sm:text-xs')
  })
})
