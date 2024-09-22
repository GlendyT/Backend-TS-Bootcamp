import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import { dashboardProductSchema, Product, productSchema } from '../types'

export const getProducts = async () => {
  try {
    const { data } = await api.get('/products')
    const response = dashboardProductSchema.safeParse(data)
    if (response.success) {
      return response.data
    } else {
      throw new Error('Invalid product data')
    }
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
    throw error
  }
}

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const { data } = await api.get(`/products/${id}`)
    const response = productSchema.safeParse(data)

    if (response.success) {
      return response.data
    } else {
      throw new Error('Invalid product data')
    }
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error)
    }
    throw error
  }
}
