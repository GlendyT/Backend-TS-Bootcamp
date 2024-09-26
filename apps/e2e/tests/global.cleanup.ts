import { PrismaClient } from '@repo/db'
import { cleanup } from '@repo/db/cleanup'
import { test as teardown } from '@playwright/test'
const prisma = new PrismaClient()


teardown.describe('global teardown ', () => {
  teardown('cleanup database', async () => {
    console.log('Cleanup database...')
    try {
      await cleanup()
      console.log('Cleanup succesfuly')
    } catch (error) {
      console.log('Error cleaningup database:', error)
    } finally {
      await prisma.$disconnect()
    }
  })
})
