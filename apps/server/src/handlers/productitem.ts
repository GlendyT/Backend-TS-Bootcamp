import { PrismaClient } from '@repo/db'

const prisma = new PrismaClient()

type VinylProps = {
  id?: number
  title: string
  artist: string
  image: string
  categoryId: number
  conditionId: number
}

export const createVinyl = async ({
  title,
  artist,
  image,
  categoryId,
  conditionId,
}: VinylProps) => {
  return prisma.vinyl.create({
    data: {
      title,
      artist,
      image,
      category: { connect: { id: categoryId } },
      condition: { connect: { id: conditionId } },
    },
  })
}

export const getVinyls = async () => {
  return prisma.vinyl.findMany({
    include: {
      category: true,
      condition: true,
    },
  })
}

export const getVinylById = async (id: number) => {
  return prisma.vinyl.findUnique({
    where: { id },
    include: {
      category: true,
      condition: true,
    },
  })
}

export const updateVinyl = async ({
  id,
  title,
  artist,
  image,
  categoryId,
  conditionId,
}: VinylProps) => {
  try {
    // Fetch the existing vinyl to ensure it exists
    const existingVinyl = await prisma.vinyl.findUnique({ where: { id } })

    if (!existingVinyl) {
      throw new Error('Vinyl not found')
    }

    // Update the vinyl with new data or retain existing data if not provided
    const updatedVinyl = await prisma.vinyl.update({
      where: { id },
      data: {
        title: title || existingVinyl.title,
        artist: artist || existingVinyl.artist,
        image: image || existingVinyl.image,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        condition: conditionId ? { connect: { id: conditionId } } : undefined,
      },
    })

    return updatedVinyl
  } catch (error) {
    console.error('Error updating vinyl:', error)
    throw error
  }
}

export const getVinylDelete = async (id: number) => {
  const vinylDelete = await prisma.vinyl
    .delete({
      where: { id },
    })
    .catch(() => null)

  return vinylDelete
}
