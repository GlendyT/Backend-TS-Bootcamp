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

export const Route = createFileRoute('/products/')({
  component: Products,
  loader: getProducts,
})

function Products() {
  const products = Route.useLoaderData<Product[]>()

  const { category, conditions, priceSort } = useSearch({
    category: String,
    conditions: String,
    priceSort: String,
  })

  const categories = getCategories(products)
  const selectedCategory = getSelectedCategory(categories, category)
  const filteredProducts = filterProductsByCategory(products, selectedCategory)

  const conditionAll = getConditions(products)
  const selectedCondition = getSelectedCondition(conditionAll, conditions)

  let filteredPrice = filterProductsByPrice(filteredProducts, selectedCondition)
  filteredPrice = sortProductsByPrice(filteredPrice, priceSort)

  return (
    <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto  h-full">
      <Sidebar />
      <div className="grid gap-2 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 max-2xl:grid-cols-5 grid-cols-6 overflow-auto bg-slate-950 border-black rounded-t-2xl ">
        {filteredPrice.map((product) => (
          <VinylProductsGrid key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
