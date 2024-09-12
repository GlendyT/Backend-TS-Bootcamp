import { PrismaClient, VinylProducts, VinylVariants } from '@repo/db'

const prisma = new PrismaClient()


type VinylProps = {
  id: number
  title: string
  artist: string
  image: string
  categoryId: number
  conditions: VinylVariants[]
  error?: string
  vinyl?: VinylProducts
}

export const createVinyl = async ({
  title,
  artist,
  image,
  categoryId,
  conditions,
}: VinylProps) => {
  if (!title || !artist || !image || !categoryId) {
    return { error: 'All spaces must be filled out' }
  }

  if (
    !conditions ||
    conditions.some(({ condition, price }) => !condition || price <= 0)
  ) {
    return { error: 'Condition or price must be filled out' }
  }

  try {
    const vinyl = await prisma.vinylProducts.create({
      data: {
        title,
        artist,
        image,
        category: { connect: { id: categoryId } },
        conditions: {
          create: conditions.map(({ condition, price }) => ({
            condition,
            price,
          })),
        },
      },
      include: {
        conditions: true,
      },
    })

    return { vinyl }
  } catch (error) {
    console.error('Error creating Vinyl', error)
    return { error: 'Error while creating product' }
  }
}

export const getVinyls = async (): Promise<VinylProps[]> => {
  return prisma.vinylProducts.findMany({
    include: {
      category: true,
      conditions: true,
    },
  })
}

export const getVinylById = async (id: number) => {
  return prisma.vinylProducts.findUnique({
    where: { id },
    include: {
      category: true,
      conditions: true,
    },
  })
}

export const updateVinyl = async ({
  id,
  title,
  artist,
  image,
  categoryId,
  conditions,
}: VinylProps) => {
  try {
    const existingVinyl = await prisma.vinylProducts.findUnique({
      where: { id },
      include: { conditions: true },
    })

    if (!existingVinyl) {
      throw new Error('Vinyl not found')
    }
    await prisma.vinylProducts.update({
      where: { id },
      data: {
        title: title || existingVinyl.title,
        artist: artist || existingVinyl.artist,
        image: image || existingVinyl.image,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    })

    if (conditions) {
      await Promise.all(
        conditions.map((condition) =>
          prisma.vinylVariants.upsert({
            where: { id: condition.id || 0 },
            update: {
              condition: condition.condition,
              price: condition.price,
            },
            create: {
              vinylId: id,
              condition: condition.condition,
              price: condition.price,
            },
          }),
        ),
      )

      const newConditionIds = new Set(
        conditions.map((condition) => condition.id),
      )
      const conditionsToRemove = existingVinyl.conditions
        .filter((c) => !newConditionIds.has(c.id))
        .map((c) => c.id)

      if (conditionsToRemove.length > 0) {
        await prisma.vinylVariants.deleteMany({
          where: { id: { in: conditionsToRemove } },
        })
      }
    }

    return await prisma.vinylProducts.findUnique({
      where: { id },
      include: { conditions: true },
    })
  } catch (error) {
    console.error('Error updating vinyl:', error)
    throw error
  }
}

export const getVinylDelete = async (id: number) => {
  try {
    const existingVinyl = await prisma.vinylProducts.findUnique({
      where: { id },
    })

    if (!existingVinyl) {
      return
    }

    const deletedVinyl = await prisma.$transaction(async (prisma) => {
      await prisma.vinylVariants.deleteMany({
        where: { vinylId: id },
      })

      return await prisma.vinylProducts.delete({
        where: { id },
      })
    })

    return deletedVinyl
  } catch (error) {
    console.error('Error deleting vinyl:', error)
    throw new Error('Failed to delete vinyl')
  }
}
