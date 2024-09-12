import { Category, Condition, Product } from '../types'

export const getCategories = (products: Product[]): Category[] => {
  return Array.from(
    new Set(
      products?.map((product: { category: { id: number; name: string } }) => ({
        id: product.category.id,
        name: product.category.name,
      })),
    ),
  )
}

export const getSelectedCategory = (
  categories: Category[],
  categoryName: Category["name"], // Cambiado para recibir el nombre de la categoría como string
): Category['id']  => {
  const defaultCategory: Category = {id:0, name: "All Categories"}
  const selectedCategory = categories.find(cat => cat.name === categoryName) || defaultCategory;
  return  selectedCategory?.id  ;
}

export const filterProductsByCategory = (
  products: Product[],
  selectedCategory: Category["id"],
): Product[]=> {
  return selectedCategory
    ? products?.filter(
        (product: Product) => product.category.id === selectedCategory,
      )
    : products
}

export const getConditions = (products: Product[]): Condition[] => {
  const allConditions = products.flatMap(product => product.conditions);

  const conditionMap = new Map<string, Condition>();
  for (const condition of allConditions) {
    const key = `${condition.id}-${condition.price}`;
    if (!conditionMap.has(key)) {
      conditionMap.set(key, condition);
    }
  }

  return Array.from(conditionMap.values());
}

export const getSelectedCondition = (
  conditionAll: Condition[],
  selectedConditions: Condition["price"],
): number | null => {
  return (
    conditionAll.find((cond: Condition) => cond.price === selectedConditions)?.id ||
    null
  )
}

export const filterProductsByPrice = (
  filteredProducts: Product[],
  selectedCondition: number | null,
) => {
  return selectedCondition
    ? filteredProducts?.filter((product: { conditions: Condition[] }) =>
        product.conditions.some(
          (condition: { id: number }) => condition.id === selectedCondition,
        ),
      )
    : filteredProducts
}

export const sortProductsByPrice = (
  filteredPrice: Product[],
  priceSort: 'asc' | 'desc',
): Product[] => {
  if (priceSort === 'asc') {
    return filteredPrice?.sort(
      (a: Product, b: Product) =>
        Math.min(...a.conditions.map((c: Condition) => c.price)) -
        Math.min(...b.conditions.map((c: Condition) => c.price)),
    )
  } else if (priceSort === 'desc') {
    return filteredPrice?.sort(
      (a: Product, b: Product) =>
        Math.max(...b.conditions.map((c: Condition) => c.price)) -
        Math.max(...a.conditions.map((c: Condition) => c.price)),
    )
  }
  return filteredPrice
}

