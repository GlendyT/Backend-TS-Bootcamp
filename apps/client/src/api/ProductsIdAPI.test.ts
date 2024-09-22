import { isAxiosError } from 'axios'
import { getProductById } from './ProductsAPI'
import api from '@/lib/axios'

jest.mock('@/lib/axios', () =>( {
  get: jest.fn(),  
}))
jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}))

describe('getProductsById', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return valid product data when the API returns a valid response', async () => {
    const mockData = {
      id: 1,
      title: 'Album 1',
      artist: 'Artist 1',
      image: 'image1.jpg',
      categoryId: 1,
      createdAt: '2023-09-01T00:00:00Z',
      updatedAt: '2023-09-01T00:00:00Z',
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
      ],
    }
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockData })

    const products = await getProductById(1)
    expect(products).toEqual(mockData)
    expect(api.get).toHaveBeenCalledWith('/products/1')
  })

  it('should throw an error for invalid product data', async () => {
    const invalidData = { invalidField: 'invalid'};
    (api.get as jest.Mock).mockResolvedValue({data: invalidData})

    await expect(getProductById(1)).rejects.toThrow('Invalid product data')
    expect(api.get).toHaveBeenCalledWith('/products/1')
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

    await expect(getProductById(1)).rejects.toThrow('Failed to fetch products')
    expect(api.get).toHaveBeenCalledWith('/products/1')
  })

  it('show throw a generic error for a non-axios errors', async () => {
    const genericError = new Error('some generic error')
    ;(api.get as jest.Mock).mockRejectedValue(genericError)
    ;(isAxiosError as unknown as jest.Mock).mockReturnValue(false)

    await expect(getProductById(1)).rejects.toThrow('some generic error')
    expect(api.get).toHaveBeenCalledWith('/products/1')
  })
})
