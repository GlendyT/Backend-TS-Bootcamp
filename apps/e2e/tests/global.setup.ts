import { PrismaClient } from '@repo/db'
import { seed } from '@repo/db/seed'
import { test as setup } from '@playwright/test'
const prisma = new PrismaClient()

setup.describe('global setup', () => {
  setup('seed database', async () => {
    console.log('Seeding database...')
    try {
      await seed()
      console.log('Seeding completed succesfuly')
    } catch (error) {
      console.log('Error seeding database:', error)
    } finally {
      await prisma.$disconnect()
    }
  })
})
