import { useRouter } from '@tanstack/react-router'
import { Category } from '@/types/index'
import { useState } from 'react'

interface CategoryIdProps {
  categories: Category[]
  selectedCategory: Category['id']
  onCategoryChange: (categoryId: Category['id']) => void
}

function CategoryId({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryIdProps) {
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)

  const handleCategoryClick = (categoryId: Category['id']) => {
    onCategoryChange(categoryId)
    if (categoryId === 0) {
      router.navigate({ to: '/products' })
    } else {
      const selectedCategoryName =
        categories.find((cat) => cat.id === categoryId)?.name || 'all'
      router.navigate({
        search: { category: selectedCategoryName },
      })
    }
  }

  const visibleCategories = showMore ? categories : categories.slice(0, 5)

  return (
    <div className="flex flex-col text-center text-sm max-sm:text-xs ">
      <label className="text-slate-200 font-extrabold pt-4 text-xs">SORT BY </label>
      <button
        className={` py-2 px-4 rounded text-slate-300 ${selectedCategory === 0 ? ' bg-slate-900 font-extrabold' : ' '}`}
        onClick={() => handleCategoryClick(0)}
      >
        All Categories
      </button>

      {visibleCategories.map((category) => (
        <button
          key={category.id}
          className={`py-2 px-4 rounded text-slate-300 ${selectedCategory === category.id ? 'bg-slate-900  font-extrabold' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </button>
      ))}

      <button
        className="py-2 px-4 rounded bg-gray-900 mt-2 text-slate-400 hover:bg-gray-800 hover:text-slate-100"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

export default CategoryId
