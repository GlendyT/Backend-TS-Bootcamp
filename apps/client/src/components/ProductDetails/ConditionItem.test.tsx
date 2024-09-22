import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConditionItem from './ConditionItem'
import { formatCurrency } from '@/utils/formatCurrency'
import { Condition } from '@/types/index'

jest.mock('@/utils/formatCurrency', () => ({
  formatCurrency: jest.fn(() => '$${price.toFixed(2)}'),
}))

describe('ConditionItem component', () => {
  const mockCondition: Condition = {
    id: 1,
    condition: 'old',
    price: 1000,
    vinylId: 1,
  }
  test('renders condition and price correctly', () => {
    render(<ConditionItem statusVinyl={mockCondition} />)

    const conditionLabel = screen.getByText('Condition:')
    expect(conditionLabel).toBeInTheDocument()

    const conditionData = screen.getByText(mockCondition.condition)
    expect(conditionData).toBeInTheDocument()

    const formattedPrice = formatCurrency(mockCondition.price)
    const priceElement = screen.getByText(formattedPrice)
    expect(priceElement).toBeInTheDocument()
  })
})
