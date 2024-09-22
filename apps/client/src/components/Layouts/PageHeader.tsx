import { getProducts } from '@/api/ProductsAPI'
import Logo from '@/utils/Logo'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Product } from '@/types/index'
import { useCart } from '@/hooks/useCart'
import CartItem from '../CartDetails/CartItem'

export default function PageHeader() {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  const { order, cartTotal } =
    useCart()

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const filteredProducts = searchTerm
    ? products?.filter((product) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.artist.toLowerCase().includes(searchLower)
        )
      }) ?? []
    : []

  const handleClickNavigation = (id: Product['id']) => {
    setSearchTerm('')
    navigate({ to: `/products/${id}` })
  }

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 px-4 sticky bg-black">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-14">
          <Link to={'/products'}>
            <Logo />
          </Link>
        </div>
      </div>
      <Link
        to={'/products'}
        className="flex items-center font-black text-white max-sm:hidden"
      >
        All Products
      </Link>

      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
        </div>
        {searchTerm && (
          <div className="top-20 absolute px-36 pb-6 w-2/5 mx-8 max-sm:px-20 max-md:px-20 max-lg:px-20 max-xl:px-20 bg-black bg-opacity-60 backdrop-blur-2xl rounded-3xl">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <>
                  <div
                    key={product.id}
                    className="pb-2 px-2 border-b border-gray-500 w-full "
                  >
                    <div
                      className="cursor-pointer flex flex-row justify-between"
                      onClick={() => handleClickNavigation(product.id)}
                    >
                      <div className="flex flex-col text-slate-200">
                        <p>{product.title}</p>
                        <p className="text-[0.6rem] font-extrabold">
                          {product.artist}
                        </p>
                      </div>
                      <img src={product.image} className="w-10 flex items-center" />
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p className="p-2 text-slate-200">Not Found</p>
            )}
          </div>
        )}
      </div>

      <CartItem
        order={order}
        cartTotal={cartTotal}
      />
    </div>
  )
}
