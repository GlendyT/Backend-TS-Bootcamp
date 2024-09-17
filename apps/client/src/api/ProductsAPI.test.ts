import { isAxiosError } from 'axios'
import { getProducts } from './ProductsAPI'
import api from '@/lib/axios'

jest.mock('@/lib/axios', () => {
  const actualAxios = jest.requireActual('axios')
  return {
    ...actualAxios,
    create: jest.fn(() => actualAxios),
    get: jest.fn(),
  }
})
jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}))

describe('getProducts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return valid product data when the API returns a valid response', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Album 1',
        artist: 'Artist 1',
        image: 'image1.jpg',
        categoryId: 1,
        category: {
          id: 1,
          name: 'Rock',
        },
        conditions: [
          {
            id: 1,
            condition: 'new',
            price: 20,
            vinylId: 1,
          },
          {
            id: 2,
            condition: 'used',
            price: 10,
            vinylId: 1,
          },
        ],
      },
      {
        id: 2,
        title: 'Album 2',
        artist: 'Artist 2',
        image: 'image2.jpg',
        categoryId: 2,
        category: {
          id: 2,
          name: 'Jazz',
        },
        conditions: [
          {
            id: 3,
            condition: 'new',
            price: 25,
            vinylId: 2,
          },
          {
            id: 4,
            condition: 'used',
            price: 15,
            vinylId: 2,
          },
        ],
      },
    ]

    ;(api.get as jest.Mock).mockResolvedValue({ data: mockData })

    const products = await getProducts()

    expect(products).toEqual(mockData)
    expect(api.get).toHaveBeenCalledWith('/products')
  })

  it('should trhow an error for invalid product data', async () => {
    const invalidData = { invalidField: 'invalid' }
    ;(api.get as jest.Mock).mockResolvedValue({ data: invalidData })

    await expect(getProducts()).rejects.toThrow('Invalid product data')
    expect(api.get).toHaveBeenCalledWith('/products')
  })

  it('should handle an axios error with a custom error message', async () => {
    const mockError = {
      response: {
        data: { error: 'Failed to fetch products' },
      },
      message: 'Request failed',
    }
    ;(api.get as jest.Mock).mockRejectedValue(mockError)
    ;(isAxiosError as unknown as jest.Mock).mockReturnValue(true)

    await expect(getProducts()).rejects.toThrow('Failed to fetch products')
    expect(api.get).toHaveBeenCalledWith('/products')
  })

  it('show throw a generic error for a non-axios errors', async () => {
    const genericError = new Error('some generic error')
    ;(api.get as jest.Mock).mockRejectedValue(genericError)
    ;(isAxiosError as unknown as jest.Mock).mockReturnValue(false)

    await expect(getProducts()).rejects.toThrow('some generic error')
    expect(api.get).toHaveBeenCalledWith('/products')
  })
})
