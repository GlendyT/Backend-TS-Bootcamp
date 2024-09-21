import { test, expect } from '@playwright/test'

test('Filter Buttons', async ({ page }) => {
  await page.goto('http://localhost:5173/products')

  const rockButton = page.getByRole('button', { name: 'Rock' })
  await expect(rockButton).toBeVisible()
  await rockButton.click()

  const popButton = page.getByRole('button', { name: 'Pop' })
  await expect(popButton).toBeVisible()
  await popButton.click()

  const allCategoriesButton = page.getByRole('button', {
    name: 'All Categories',
  })
  await expect(allCategoriesButton).toBeVisible()
  await allCategoriesButton.click()

  const lowToHigh = page.getByText('Low to High')
  await expect(lowToHigh).toBeVisible()
  await lowToHigh.click()

  const highToLow = page.getByText('High to Low')
  await expect(highToLow).toBeVisible()
  await highToLow.click()

  const noneFilterPrice = page.getByText('None')
  await expect(noneFilterPrice).toBeVisible()
  await noneFilterPrice.click()
})
