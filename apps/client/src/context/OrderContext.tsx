import { createContext, ReactNode, useMemo, useState } from 'react'
import { Order, Product } from '../types'

type OrderContextProps = {
  order: Order[]
  addItem: (item: Product) => void
  removeItem: (id: Product['id']) => void
  placeOrder: () => void
  decreaseQuantity: (id: Order['id']) => void
  increaseQuantity: (id: Order['id']) => void
  cartTotal: number
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext<OrderContextProps | undefined>(null!)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, setOrder] = useState<Order[]>([])
  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  const addItem = (item: Product) => {
    const itemExist = order.findIndex((order) => order.id === item.id)
    if (itemExist >= 0) {
      if (order[itemExist].quantity >= MAX_ITEMS) return

      const updatedCart = [...order]
      updatedCart[itemExist].quantity++
      setOrder(updatedCart)
    } else {
      const newOrder = { ...item, quantity: MIN_ITEMS }
      setOrder([...order, newOrder])
    }
  }

  const removeItem = (id: Product['id']) => {
    setOrder(order.filter((item) => item.id !== id))
  }
  const placeOrder = () => {
    setOrder([])
  }

  const decreaseQuantity = (id: Order['id']) => {
    const updatedCart = order.map((item) =>
      item.id === id && item.quantity > MIN_ITEMS
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    setOrder(updatedCart)
  }

  const increaseQuantity = (id: Order['id']) => {
    const updatedCart = order.map((item) =>
      item.id === id && item.quantity < MAX_ITEMS
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    )
    setOrder(updatedCart)
  }

  const cartTotal = useMemo(
    () =>
      order.reduce((total, item) => {
        const conditionalTotal = item.conditions.reduce(
          (sum, condition) => sum + condition.price,
          0,
        )
        return total + item.quantity * conditionalTotal
      }, 0),
    [order],
  )

  return (
    <OrderContext.Provider
      value={{
        order,
        addItem,
        removeItem,
        placeOrder,
        decreaseQuantity,
        increaseQuantity,
        cartTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
