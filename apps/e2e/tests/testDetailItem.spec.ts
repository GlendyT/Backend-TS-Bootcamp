import { test, expect } from '@playwright/test';

test('Details Item', async ({ page }) => {
  await page.goto('http://localhost:5173/products/12');

  const titleVinyl = page.getByText('Title:')
  await expect(titleVinyl).toBeVisible()
  await titleVinyl.click();

  const titleSong = page.getByText('Mic Drop')
  await expect(titleSong).toBeVisible()
  await titleSong.click();

  const titleVinyl2 = page.getByText('Artist:')
  await expect(titleVinyl2).toBeVisible()
  await titleVinyl2.click();

  const artistTitle = page.getByText('BTS')
  await expect(artistTitle).toBeVisible()
  await artistTitle.click();

  const priceSign = page.getByText('$')
  await expect(priceSign).toBeVisible()
  await priceSign.click();

  const addToCartButton = page.getByRole('button', { name: 'Add to Cart' })
  await expect(addToCartButton).toBeVisible()
  await addToCartButton.click();
});