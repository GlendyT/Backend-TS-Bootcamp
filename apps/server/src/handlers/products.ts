import { Request, Response } from 'express'
import {
  createVinyl,
  getVinylById,
  getVinylDelete,
  getVinyls,
  updateVinyl,
} from './productitem'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const vinylsItems = await getVinyls()
    res.status(201).json(vinylsItems)
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const vinylId = await getVinylById(id)

    if (!vinylId) {
      return res.status(404).json({
        error: 'Vinyl not found',
      })
    }
    res.status(201).json(vinylId)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the vinyl' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newVinyl = await createVinyl(req.body)
    res.status(201).json(newVinyl)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)

  const existingVinyl = await getVinylById(id)
  if (!existingVinyl) {
    return res.status(404).json({ error: 'Vinyl not found' })
  }
  const { title, artist, image, categoryId, conditionId } = req.body

  try {
    const updatedVinyl = await updateVinyl({
      id,
      title,
      artist,
      image,
      categoryId,
      conditionId,
    })
    res.json(updatedVinyl)
  } catch (error) {
    console.error('Error updating vinyl:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the vinyl' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {

  try {
    const id = parseInt(req.params.id, 10)
    const deletedVinyl = await getVinylDelete(id)
    if (!deletedVinyl) {
      return res.status(404).json({ error: 'Vinyl not found' })
    }
  
    return res.status(200).json('Vinyl Successfuly deleted')
  } catch (error) {
    console.error(error)


    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the vinyl' })
  }
}
