import { test, expect } from '@playwright/test';


test('Title of Page', async ({ page }) => {
  await page.goto('http://localhost:5173/products');

  await expect(page.getByText('All products')).toBeVisible();
});
