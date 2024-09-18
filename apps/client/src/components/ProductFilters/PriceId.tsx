import { useRouter } from '@tanstack/react-router'
import { ChangeEvent, useState } from 'react'

interface PriceIdProps {
  onPriceSortChange: (newSort: 'asc' | 'desc' | 'rev') => void
}

export default function PriceId({ onPriceSortChange }: PriceIdProps) {
  const [sortOrder, setSortOrder] = useState('')
  const router = useRouter()

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = e.target.value as 'asc' | 'desc' | 'rev'
    setSortOrder(newSortOrder)

    if (newSortOrder === 'rev') {
      router.navigate({ to: '/products' })
    } else {
      onPriceSortChange(newSortOrder)
    }
  }

  return (
    <div className="flex flex-col text-center">
      <label htmlFor="priceSort" className="text-slate-300 font-extrabold text-xs ">
        SORT BY
      </label>

      <div className="py-2 flex flex-col gap-2 max-sm:text-xs">
        <label className=" px-4 py-2 flex items-center cursor-pointer">
          <input
            type="radio"
            name="priceSort"
            value="asc"
            checked={sortOrder === 'asc'}
            onChange={handleSortChange}
            className="hidden"
          />
          <span
            className={`mr-2 w-3 h-3 rounded-full flex items-center justify-center ${
              sortOrder === 'asc'
                ? 'bg-white'
                : sortOrder === ''
                  ? 'bg-transparent'
                  : 'bg-transparent'
            }`}
          ></span>
          Low to High
        </label>

        <label className=" px-4 py-2 flex items-center cursor-pointer">
          <input
            type="radio"
            name="priceSort"
            value="desc"
            checked={sortOrder === 'desc'}
            onChange={handleSortChange}
            className="hidden"
          />
          <span
            className={`mr-2 w-3 h-3 rounded-full flex items-center justify-center ${
              sortOrder === 'desc'
                ? 'bg-white'
                : sortOrder === ''
                  ? 'bg-transparent'
                  : 'bg-transparent'
            }`}
          ></span>
          High to Low
        </label>
        <label className=" px-4 py-2 flex items-center cursor-pointer">
          <input
            type="radio"
            name="priceSort"
            value="rev"
            checked={sortOrder === 'rev'}
            onChange={handleSortChange}
            className="hidden"
          />
          <span
            className={`mr-2 w-3 h-3 rounded-full flex items-center justify-center`}
          ></span>
          None
        </label>
      </div>
    </div>
  )
}
