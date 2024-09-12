import { useContext } from 'react'
import { OrderContext } from '../context/OrderContext'

export const useCart = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useCart must be used within a OrderProvider')
  }
  return context
}
