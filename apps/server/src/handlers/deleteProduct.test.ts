import request from 'supertest'
import express from 'express'
import { deleteProduct } from './products'
import { getVinylDelete } from './productitem'

jest.mock('./productItem', () => ({
  getVinylDelete: jest.fn(),
}))

const app = express()
app.delete('/api/products/:id', deleteProduct)

describe('Delete /api/products/:id', () => {
  it('should delete a vinyl and return status 200', async () => {
    const mockVinyl = { id: 1, title: 'Album to delete' }

    ;(getVinylDelete as jest.Mock).mockResolvedValue(mockVinyl)

    const response = await request(app).delete('/api/products/1')

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('Vinyl successfully deleted')
  })

  it('should return 404 if vinyl does not exist', async () => {
    ;(getVinylDelete as jest.Mock).mockResolvedValue(null)

    const response = await request(app).delete('/api/products/999')
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: 'Vinyl does not exist' })
  })

  it('should return 500 if an error occurs during deletion', async () => {
    ;(getVinylDelete as jest.Mock).mockRejectedValue(
      new Error('Deletion failed'),
    )

    const response = await request(app).delete('/api/products/null')
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
      error: 'An error occurred while deleting the vinyl',
    })
  })
})
