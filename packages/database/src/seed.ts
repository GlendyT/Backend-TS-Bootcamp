import { vinyls } from './data/vinyls'
import { categories } from './data/categories'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Crear las categorías primero
    await prisma.vinylCollections.createMany({
      data: categories
    })

    // Crear los productos de vinilo primero sin condiciones
    for (const vinyl of vinyls) {
      const createdVinyl = await prisma.vinylProducts.create({
        data: {
          title: vinyl.title,
          artist: vinyl.artist,
          image: vinyl.image,
          categoryId: vinyl.categoryId
        }
      })

      // Crear las condiciones para cada producto de vinilo
      await prisma.vinylVariants.createMany({
        data: vinyl.conditions.map((condition) => ({
          condition: condition.condition,
          price: condition.price,
          vinylId: createdVinyl.id
        }))
      })
    }
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    throw new Error('An error occurred during the database seeding process.')
  })
