// productController.test.js
import request from 'supertest'
import express from 'express'
import { getProducts } from './products'
import { getVinyls } from './productitem'

// Mocks
jest.mock('./productitem', () => ({
  getVinyls: jest.fn(),
}))

const app = express()
app.get('/api/products', getProducts)

describe('GET /api/products', () => {
  it('should return a list of vinyls with status 201', async () => {
    const mockVinyls = [
      {
        id: 1,
        title: 'Album 1',
        artist: 'Artist 1',
        image: 'image1.jpg',
        categoryId: 1,
        conditions: [],
      },
      {
        id: 2,
        title: 'Album 2',
        artist: 'Artist 2',
        image: 'image2.jpg',
        categoryId: 2,
        conditions: [],
      },
    ]
    ;(getVinyls as jest.Mock).mockResolvedValue(mockVinyls)

    const response = await request(app).get('/api/products')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(mockVinyls)
  })
  it('should return 500 status and error message if an error occurs', async () => {
    const mockError = new Error('Database connectiion failed')
    ;(getVinyls as jest.Mock).mockRejectedValue(mockError)

    const response = await request(app).get('/api/products')

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      error: 'An error occurred while retrieving the vinyl',
    })
  })
})
