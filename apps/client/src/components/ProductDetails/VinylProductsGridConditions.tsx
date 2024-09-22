import {  Condition } from "@/types/index"
import { formatCurrency } from "@/utils/formatCurrency"
import { Link } from "@tanstack/react-router"

type VinylConditionProps = {
    title: string
    artist: string
    id: number
    conditions: Condition[]
  }
  
type ConditionProps = {
    product: VinylConditionProps
}

export default function VinylProductsGridConditions({product}: ConditionProps) {
    const { title, artist, id } = product
    
  return (
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
  )
}
