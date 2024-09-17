import { formatCurrency } from '@/utils/formatCurrency'
import { Order } from '@/types/index'
import whiteBeenil from '../../assets/beenylWhite.png'
import { useEffect, useState } from 'react'
import { CartIconButton, CloseIcon } from '@/utils/IconButtons'
import CartItemDetails from './CartItemDetails'
import { useCart } from '@/hooks/useCart'

interface CartItemProps {
  order: Order[]
  cartTotal: number
}

export default function CartItem({ order, cartTotal }: CartItemProps) {
  const [isCartOpen, setCartOpen] = useState(false)
  const { removeItem, decreaseQuantity, increaseQuantity } = useCart()

  useEffect(() => {
    if (order.length > 0) {
      setCartOpen(true)
    }
  }, [order])
  return (
    <>
      <button
        className={`rounded-full w-12 h-12 m-4 flex items-center justify-center cursor-pointer shadow-xl bg-slate-600 text-white`}
        onClick={() => setCartOpen(!isCartOpen)}
      >
        <CartIconButton />
        {order.length > 0 && (
          <span className="absolute top-5 right-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {order.length}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="h-5/6 w-auto fixed top-0 right-0 z-20 flex flex-col items-end justify-center">
          <div
            className={`flex-1 w-full max-w-lg shadow-xl rounded-lg relative overflow-hidden ${order.length > 0 ? ' backdrop-blur-xl bg-white/10 ' : 'bg-none'}`}
          >
            <div className="bg-slate-950 backdrop-blur-xl bg-black/80 h-64 rounded-t-lg absolute w-full z-10"></div>

            <div className="flex flex-col overflow-y-auto h-full p-4  relative z-20 ">
              <div className="flex flex-col z-20 ml-4 text-white">
                <div className="flex flex-row justify-between items-center">
                  <img src={whiteBeenil} alt="" className="w-10 h-10" />
                  <button
                    className="bg-slate-950 text-white rounded-full w-10 h-10 m-4 flex items-center justify-center cursor-pointer shadow-xl"
                    onClick={() => setCartOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="text-3xl mb-2">Hi👋</div>
                <div className="w-60 text-gray-200 text-sm mb-1">
                  Are you excited for your new Vinyl!
                </div>
              </div>
              {order.length === 0 ? (
                <div className="text-center z-20 text-white flex flex-col text-2xl ">
                  Empty Cart
                </div>
              ) : (
                <div className="relative z-20 overflow-y-auto overflow-hidden">
                  <div className="rounded shadow-md text-sm  backdrop-blur-xl bg-white/90">
                    <div className=" rounded-t-none rounded-b flex flex-col">
                      {order.map((item) => (
                        <CartItemDetails
                          key={item.id}
                          item={item}
                          decreaseQuantity={decreaseQuantity}
                          increaseQuantity={increaseQuantity}
                          removeItem={removeItem}
                        />
                      ))}
                    </div>
                  </div>
                  <div className=" rounded z-20 shadow-md mt-4">
                    <div className="backdrop-blur-xl bg-white/80 rounded-t-none rounded-b p-6 flex flex-row space-y-2 items-center justify-between ">
                      Total Order
                      <span className="font-semibold text-sm flex justify-between">
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-black cursor-pointer text-white rounded flex items-center justify-center p-4 z-20">
                    Checkout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
