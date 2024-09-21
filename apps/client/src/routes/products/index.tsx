import { getProducts } from '@/api/ProductsAPI'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import {
  getCategories,
  getSelectedCategory,
  filterProductsByCategory,
  getConditions,
  getSelectedCondition,
  filterProductsByPrice,
  sortProductsByPrice,
} from '@/hooks/productFilters'
import { Product } from '@/types/index'
import VinylProductsGrid from '@/components/ProductDetails/VinylProductsGrid'
import Sidebar from '@/components/Layouts/Sidebar'

export interface ProductsSearchParams {
  category?: string;
  conditions?: string;
  priceSort?: string;
}

export const Route = createFileRoute('/products/')({
  component: Products,
  loader: getProducts,
  validateSearch: (search): ProductsSearchParams => ({
    category: search.category ? String(search.category) : undefined,
    conditions: search.conditions ? String(search.conditions) : undefined,
    priceSort: search.priceSort ? String(search.priceSort) : undefined,
  }),
})

function Products() {
  const products = Route.useLoaderData<Product[]>()
  const search = useSearch({ from: '/products/' }) 
  const category = search.category ?? ''
  const conditions = search.conditions ?? ''
  const priceSort = search.priceSort ?? ''

  const conditionId = conditions ? Number(conditions) : undefined

  const categories = getCategories(products)
  const selectedCategory = getSelectedCategory(categories, category)
  const filteredProducts = filterProductsByCategory(products, selectedCategory)

  const conditionAll = getConditions(products)
  const selectedCondition = getSelectedCondition(conditionAll, conditionId || 0)

  let filteredPrice = filterProductsByPrice(filteredProducts, selectedCondition)
  if (priceSort === 'asc' || priceSort === 'desc') {
    filteredPrice = sortProductsByPrice(filteredPrice, priceSort)
  }


  return (
    <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto  h-full">
      <Sidebar category={category} priceSort={priceSort} />
      <div className="grid gap-2 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 max-2xl:grid-cols-5 grid-cols-6 overflow-auto bg-slate-950 border-black rounded-t-2xl ">
        {filteredPrice.map((product) => (
          <VinylProductsGrid key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
