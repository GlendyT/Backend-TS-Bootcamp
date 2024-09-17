import request from 'supertest'
import express from 'express'
import { getProductById } from './products'
import { getVinylById } from './productitem'

jest.mock('./productitem', () => ({
  getVinylById: jest.fn(),
}))

const app = express()
app.get('/api/products/:id', getProductById)

describe('GetById /api/products/id', () => {
  it('should return a product with the given id', async () => {
    const mockVinylId = {
      id: 1,
      title: 'Album 1',
      artist: 'Artist 1',
      image: 'image1.jpg',
      categoryId: 1,
      conditions: [],
    }
    ;(getVinylById as jest.Mock).mockResolvedValue(mockVinylId)

    const response = await request(app).get('/api/products/1')
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(mockVinylId)
  })

  it('should return a 404 if product is not found', async () => {
    ;(getVinylById as jest.Mock).mockResolvedValue(null)

    const response = await request(app).get('/api/products/999')
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: 'Vinyl does not exist' })
  })

  it('should return 500 status and error message if an error occurs', async () => {
    const mockError = new Error('Database connectiion failed')
    ;(getVinylById as jest.Mock).mockRejectedValue(mockError)

    const response = await request(app).get('/api/products/null')

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      error: 'An error occurred while retrieving the vinyl',
    })
  })
})
