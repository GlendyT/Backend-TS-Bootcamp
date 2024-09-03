import { Request, Response } from 'express'
import { VinylVariants } from '@repo/db'
import {
  createVinyl,
  getVinylById,
  getVinylDelete,
  getVinyls,
  updateVinyl,
} from './productitem'

type VinylProps = {
  id: number
  title: string
  artist: string
  image: string
  categoryId: number
  conditions: VinylVariants[]
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const vinylsItems = await getVinyls()
    res.status(201).json(vinylsItems)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the vinyl' })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const vinylId = await getVinylById(id)

    if (!vinylId) {
      return res.status(404).json({
        error: 'Vinyl does not exist',
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
  const result = await createVinyl(req.body);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({ message: 'New Product created successfully', newVinyl: result.vinyl });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)

  const existingVinyl = await getVinylById(id)
  if (!existingVinyl) {
    return res.status(404).json({ error: 'Vinyl not found' })
  }

  const { title, artist, image, categoryId, conditions }: VinylProps = req.body

  if (conditions.some(({ condition, price }) => !condition || price <= 0)) {
    return res
      .status(400)
      .json({ error: 'Condition or price fields must be filled' })
  }

  try {
    const updatedVinyl = await updateVinyl({
      id,
      title,
      artist,
      image,
      categoryId,
      conditions,
    })
    return res
      .status(200)
      .json({ message: 'Product updated successfully', updatedVinyl })
  } catch (error) {
    console.error('Error updating vinyl:', error)
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the vinyl' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const deletedVinyl = await getVinylDelete(id)

    if (!deletedVinyl) {
      return res.status(404).json({ error: 'Vinyl does not exist' })
    }

    return res.status(200).json('Vinyl successfully deleted')
  } catch (error) {
    console.error(error)

    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the vinyl' })
  }
}
