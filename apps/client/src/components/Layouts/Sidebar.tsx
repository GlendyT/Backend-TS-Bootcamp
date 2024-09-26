import { getCategories, getSelectedCategory } from '@/hooks/productFilters'
import {  useRouter } from '@tanstack/react-router'
import CategoryId from '../ProductFilters/CategoryId'
import PriceId from '../ProductFilters/PriceId'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/ProductsAPI'
export interface ProductsSearchParams {
  category?: string;
  priceSort?: string;
}

export default function Sidebar({category, priceSort}: ProductsSearchParams) {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
  
  const router = useRouter()


  const categories = products ? getCategories(products) : []
  const selectedCategory = getSelectedCategory(categories, category || '')

  return (
    <>
      <div className=" h-full overflow-x-hidden overflow-y-auto scrollbar-hidden px-2 sticky top-0  bg-black text-slate-300 z-10 border-black border-t-4 rounded-2xl ">
        <div className=" pb-4 flex flex-col ml-1 gap-3">
          <CategoryId
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(categoryId) => {
              const selectedCategoryName =
                categories.find((cat) => cat.id === categoryId)?.name || 'all'
              router.navigate({
                search: { category: selectedCategoryName, priceSort},
              })
            }}
          />
          <hr />
          <PriceId
            onPriceSortChange={(newSort) => {
              router.navigate({
                search: { category, priceSort: newSort },
              })
            }}
          />
        </div>
      </div>
    </>
  )
}
