import request from 'supertest'
import express from 'express'
import { createVinyl } from './productitem'
import { createProduct } from './products'

jest.mock('./productitem', () => ({
  createVinyl: jest.fn(),
}))

const app = express()
app.use(express.json())
app.post('/api/products', createProduct)

describe('POST /api/products', () => {
  it('should create a new product and return status 201', async () => {
    const mockVinyl = {
      id: 1,
      title: 'New Album',
      artist: 'New Artist',
      image: 'newImage.jpg',
      categoryId: 1,
      conditions: [],
    }
    ;(createVinyl as jest.Mock).mockResolvedValue({ vinyl: mockVinyl })

    const response = await request(app).post('/api/products').send(mockVinyl)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      message: 'New Product created successfully',
      newVinyl: mockVinyl,
    })
  })

  it('should return status 400 if there is an error during creation', async () => {
    const mockError = 'Validation error'
    ;(createVinyl as jest.Mock).mockResolvedValue({ error: mockError })

    const response = await request(app).post('/api/products').send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ error: mockError })
  })
})
