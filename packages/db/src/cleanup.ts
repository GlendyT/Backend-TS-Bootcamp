import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function cleanup() {
  await prisma.vinylVariants.deleteMany()
  await prisma.vinylProducts.deleteMany()
  await prisma.vinylCollections.deleteMany()

  await prisma.$executeRaw`DO $$ BEGIN IF EXISTS (SELECT * FROM pg_class WHERE relname = 'VinylProducts_id_seq') THEN ALTER SEQUENCE "VinylProducts_id_seq" RESTART WITH 1; END IF; END $$;`;
  await prisma.$executeRaw`DO $$ BEGIN IF EXISTS (SELECT * FROM pg_class WHERE relname = 'VinylVariants_id_seq') THEN ALTER SEQUENCE "VinylVariants_id_seq" RESTART WITH 1; END IF; END $$;`;
  await prisma.$executeRaw`DO $$ BEGIN IF EXISTS (SELECT * FROM pg_class WHERE relname = 'VinylCollections_id_seq') THEN ALTER SEQUENCE "VinylCollections_id_seq" RESTART WITH 1; END IF; END $$;`;
}
cleanup()
  .then(async () => {
    console.log("Cleanup successful");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("Error during cleanup:", e);
    await prisma.$disconnect()
  })
