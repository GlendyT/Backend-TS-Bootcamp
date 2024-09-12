import { Link } from '@tanstack/react-router'
import { Product } from '@/types/index'
import { formatCurrency } from '@/helpers/index'

type VinylProductsGridProps = {
  product: Product
}

export default function VinylProductsGrid({ product }: VinylProductsGridProps) {
  const { image, title, artist, id } = product
  return (
    <div className="flex flex-col items-center justify-center pb-1 pt-1 ">
      <div className=" text-white hover:bg-slate-900 p-2 rounded-lg">
        <Link
          to={`/products/${id}`}
          className="flex items-center justify-center "
        >
          <img
            src={image}
            className="block w-48 h-48 object-cover rounded-t-lg "
          />
        </Link>

        <div className="flex flex-col gap-1 w-full  rounded-b-lg pb-2">
          <Link to={`/products/${id}`} className="flex-shrink-0">
            <p className="text-md font-semibold text-center py-2">{title}</p>
            <p className=" font-extrabold text-xs text-center">{artist}</p>
          </Link>
          {product.conditions.map((condition) => (
            <div
              key={condition.id}
              className="flex justify-between mt-2 text-xs font-extrabold px-2"
            >
              Price:
              <span className="text-gray-300 text-center">
                {formatCurrency(condition.price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
