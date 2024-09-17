import { Link } from '@tanstack/react-router'
import { Condition } from '@/types/index'
import VinylProductsGridConditions from './VinylProductsGridConditions'

type ProducProps = {
  image: string
  title: string
  artist: string
  id: number
  conditions: Condition[]
}

type VinylProductsGridProps = {
  product: ProducProps
}

export default function VinylProductsGrid({ product }: VinylProductsGridProps) {
  const { image, id } = product
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
        <VinylProductsGridConditions product={product}/>
      </div>
    </div>
  )
}
