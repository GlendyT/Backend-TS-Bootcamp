import { getProductById } from '@/api/ProductsAPI'
import ConditionItem from '@/components/ProductDetails/ConditionItem'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types/index'
import { createFileRoute } from '@tanstack/react-router'
import { AddToCartButton } from '@/utils/IconButtons'
import TitleStyles from '@/utils/TitlesStyles'

export const Route = createFileRoute('/products/$id')({
  component: ProductId,
  loader: async ({ params }) => await getProductById(Number(params.id)),
})

function ProductId() {
  const product = Route.useLoaderData<Product>()

  const { addItem } = useCart()

  return (
    <div className=" flex p-2 items-center justify-center ">
      <div className="flex flex-row max-sm:flex-col gap-8 max-sm:gap-2 pt-4 max-sm:pt-0">
        <div className="bg-black p-20 m-18 max-sm:p-12 max-sm:m-10 rounded-full flex items-center justify-center">
          <img
            src={product.image}
            className="w-36 h-36 rounded-full border-4 border-white"
          />
        </div>

        <div className="flex flex-col items-end justify-end max-sm:items-center ">
          <TitleStyles label="Title:" data={product.title} />
          <TitleStyles label="Artist:" data={product.artist} />
          <TitleStyles label="Category:" data={product.category.name} />
          <div className="flex flex-row font-extrabold italic items-center justify-center">
            {product.conditions.map((statusVinyl) => (
              <ConditionItem key={statusVinyl.id} statusVinyl={statusVinyl} />
            ))}
          </div>
          <button
            type="button"
            className="bg-black w-100 p-3 rounded-lg text-white flex flex-row gap-2 items-center"
            onClick={() => addItem(product)}
          >
            <AddToCartButton />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
