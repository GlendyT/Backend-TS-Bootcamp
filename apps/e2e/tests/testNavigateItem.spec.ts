import { test, expect } from '@playwright/test'

test('Navigation Item', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const vinylProduct12 = page.locator('div:nth-child(12) > .text-white > a')
  await expect(vinylProduct12).toBeVisible()
  await vinylProduct12.click()

  const allVinylsProducts = page.getByRole('link', { name: 'All Products' })
  await expect(allVinylsProducts).toBeVisible()
  await allVinylsProducts.click()

  const vinylProduct5 = page.locator('div:nth-child(5) > .text-white > a')
  await expect(vinylProduct5).toBeVisible()
  await vinylProduct5.click()
})
