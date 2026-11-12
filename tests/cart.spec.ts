import { test, expect } from '@playwright/test'; 

test('Going Solo on the Add to cart functionality', async({page}) => {
  await page.goto('https://www.saucedemo.com/');

  // Loging in - 
  await page.locator('[data-test = "username"]').fill('standard_user');
  await page.locator('[data-test = "password"]').fill('secret_sauce');
  await page.locator('[data-test = "login-button"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

  // Now for the Add to cart test logic
  // Add to cart
  await page.locator('[data-test = "add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText('1');
  await page.locator('[data-test = "add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText('2');

  // Go to cart
  await page.locator('[data-test = "shopping-cart-link"]').click();
  await expect(page.locator('[data-test = "title"]')).toHaveText('Your Cart');
  await expect(page).toHaveURL(/.*cart.html/);

  // Remove an item from the cart
  await page.locator('[data-test = "remove-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test = "shopping-cart-link"]')).toHaveText('1');

  // Back to inventory
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test = "inventory-sidebar-link"]').click();
  await expect(page).toHaveURL(/.*inventory.html/);
});
