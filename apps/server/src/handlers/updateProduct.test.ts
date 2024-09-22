import request from 'supertest'
import express from 'express'
import { updateProduct } from './products'
import { getVinylById, updateVinyl } from './productitem'

jest.mock('./productitem', () => ({
  getVinylById: jest.fn(),
  updateVinyl: jest.fn(),
}))

const app = express()
app.use(express.json())
app.put('/api/products/:id', updateProduct)

describe('PUT /api/products/:id', () => {
  it('should updated the vinyl and return 200 on success', async () => {
    const mockVinyl = {
      id: 1,
      title: 'Existing Album',
      artist: 'Existing Artist',
    }
    const updatedVinyl = {
      id: 1,
      title: 'Updated Album',
      artist: 'Updated Artist',
      image: 'updatedimage',
      categoryId: 1,
      conditions: [{ condition: 'new', price: 30 }],
    }
    ;(getVinylById as jest.Mock).mockResolvedValue(mockVinyl)
    ;(updateVinyl as jest.Mock).mockResolvedValue(updatedVinyl)

    const response = await request(app)
      .put('/api/products/1')
      .send({
        title: 'Updated Album',
        artist: 'Updated Artist',
        image: 'updatedimage',
        categoryId: 1,
        conditions: [{ condition: 'new', price: 30 }],
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Product updated successfully',
      updatedVinyl,
    })
  })

  it('should return 404 if vinyl not found', async () => {
    ;(getVinylById as jest.Mock).mockResolvedValue(null)

    const response = await request(app)
      .put('/api/products/999')
      .send({
        id: 1,
        title: 'Updated Album',
        artist: 'Updated Artist',
        image: 'updatedimage',
        categoryId: 1,
        conditions: [{ condition: 'new', price: 25 }],
      })

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: 'Vinyl not found' })
  })

  it('should return 400 if condition or price fields are invalid', async () => {
    const mockVinyl = {
      id: 1,
      title: 'Existing Album',
      artist: 'Existing Artist',
    }
    ;(getVinylById as jest.Mock).mockResolvedValue(mockVinyl)

    const response = await request(app)
      .put('/api/products/1')
      .send({
        title: 'Updated Album',
        artist: 'Updated Artist',
        image: 'updatedimage',
        categoryId: 1,
        conditions: [{ condition: 'new', price: -5 }],
      })

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      error: 'Condition or price fields must be filled',
    })
  })

  it('should return 500 if an error occurs during update', async () => {
    const mockVinyl = {
      id: 1,
      title: 'Existing Album',
      artist: 'Existing Artist',
    }

    ;(getVinylById as jest.Mock).mockResolvedValue(mockVinyl)
    ;(updateVinyl as jest.Mock).mockRejectedValue(new Error('Update failed'))

    const response = await request(app)
      .put('/api/products/1')
      .send({
        id: 1,
        title: 'Updated Album',
        artist: 'Updated Artist',
        image: 'updatedimage',
        categoryId: 1,
        conditions: [{ condition: 'new', price: 25 }],
      })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      error: 'An error occurred while updating the vinyl',
    })
  })
})
