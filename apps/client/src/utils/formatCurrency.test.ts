import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('should format price', () => {
    const result = formatCurrency(10)
    expect(result).toEqual('$10.00')
  })
})
