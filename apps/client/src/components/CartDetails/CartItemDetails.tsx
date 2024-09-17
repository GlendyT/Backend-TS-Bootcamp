import { Order, Product } from '@/types/index'
import { formatCurrency } from '@/utils/formatCurrency'
import { MinIcon, MaxIcon, DeleteIcon } from '@/utils/IconButtons'

type CartItemDetailsProps = {
  item: Order
  removeItem: (id: Product['id']) => void
  decreaseQuantity: (id: Order['id']) => void
  increaseQuantity: (id: Order['id']) => void
}

export default function CartItemDetails({
  item,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
}: CartItemDetailsProps) {
  const { image, title } = item
  return (
    <div className="font-sans max-w-6xl mx-auto p-2">
      <div className="flex flex-row-2 gap-10  pb-2">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 shrink-0  p-2 rounded-md">
              <img src={image} className="w-full h-full object-contain" />
            </div>

            <div className="w-full">
              <h3 className="text-base font-semibold text-gray-800">{title}</h3>
              <h6 className="text-sm text-gray-800 font-bold cursor-pointer mt-0.5">
                {item.conditions.map((itemPrice) => (
                  <div key={itemPrice.id}>
                    Unit Price {formatCurrency(itemPrice.price)}
                  </div>
                ))}
              </h6>

              <div className="flex gap-4 mt-4">
                <div className="flex items-center px-2.5 py-1.5 text-gray-800 text-xs bg-transparent rounded-md">
                  <button
                    type="button"
                    className=" text-gray-800 text-xs p-1 hover:bg-slate-400"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <MinIcon />
                  </button>

                  <span className="mx-2.5">{item.quantity}</span>
                  <button
                    type="button"
                    className=" text-gray-800 text-xs p-1 hover:bg-slate-400"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <MaxIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-end justify-end">
          <button onClick={() => removeItem(item.id)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
