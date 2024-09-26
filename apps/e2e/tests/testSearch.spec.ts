import { test, expect } from '@playwright/test';

test('Search Placeholder', async ({ page }) => {
  await page.goto('http://localhost:5173/products');

  await expect(page.getByPlaceholder('Search')).toBeVisible();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('mi');

  const productList = page.locator('div').filter({ hasText: /^All ProductsVenomEminemMic DropBTS$/ });
  await expect(productList).toBeVisible();

  const micDropProduct = productList.getByRole('img').nth(2);
  await expect(micDropProduct).toBeVisible(); 
  await micDropProduct.click(); 


  await expect(page.getByPlaceholder('Search')).toBeVisible();
  await page.getByPlaceholder('Search').click();
});
