import { vinyls } from './data/vinyls'
import { categories } from './data/categories'
import { conditions } from './data/conditions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    })
    await prisma.vinylCondition.createMany({
      data: conditions,
    })
    await prisma.vinyl.createMany({
      data: vinyls,
    })
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
