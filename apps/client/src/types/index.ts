import { z } from 'zod'

// Category schema
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

// Conditions schema
export const conditionsSchema = z.array(
  z.object({
    id: z.number(),
    condition: z.string(),
    price: z.number(),
    vinylId: z.number(),
  }),
)

// Product schema
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  image: z.string(),
  categoryId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: categorySchema,
  conditions: conditionsSchema,
})

//Adding the Quantity for the OrderSchema
export const baseProductSchema = productSchema.extend({
  quantity: z.number(),
})

// Dashboard Product schema
export const dashboardProductSchema = z.array(
  productSchema.pick({
    id: true,
    title: true,
    artist: true,
    image: true,
    conditions: true,
    categoryId: true,
    category: true,
  }),
)

// Types
export type Product = z.infer<typeof productSchema>
export type Order = z.infer<typeof baseProductSchema>
export type Category = z.infer<typeof categorySchema>
export type Condition = z.infer<typeof conditionsSchema>[number]
