import { test, expect } from '@playwright/test';

// ✅ EXERCISE 1: Happy Path Login (Completed Example)
test('Exercise 1 - successful login redirects to inventory', async ({ page }) => {
  await page.goto('https://saucedemo.com');

  //await page.locator('[data-test="username"]').fill('standard_user');
  //await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
  //await page.locator('#user-name').fill('standard_user')
  //await page.getByLabel('Username').fill('standard_user')
  //await page.locator('[placeholder = "Username"]').fill('standard_user')
  //await page.locator('[aria-label = "Username"]').fill('standard_user')
  await page.locator('[name = "user-name"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce');
  //await page.locator('[data-test="login-button"]').click();
  await page.locator('.submit-button').click();

  await expect(page).toHaveURL(/.*inventory.html/);
});

// ✅ EXERCISE 2: Locked Out User Validation (Completed Example)
test('Exercise 2 - locked out user sees error message', async ({ page }) => {
  await page.goto('https://saucedemo.com');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const errorBanner = page.locator('[data-test="error"]');
  await expect(errorBanner).toBeVisible();
  await expect(errorBanner).toContainText('Sorry, this user has been locked out.');
});

// ✍️ EXERCISE 3: Product Sorting & Counting
test('Exercise 3 - sort products low to high', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // TODO 1: Select 'lohi' on the dropdown locator '[data-test="product-sort-container"]'
  // Hint: await page.locator('...').selectOption('lohi');
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // TODO 2: Assert that the first item's price ('.inventory_item_price') has text '$7.99'
  // Hint: await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});

// ✍️ EXERCISE 4: Add & Remove Cart Items
test('Exercise 4 - add and remove items updates cart badge', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // TODO 1: Click '[data-test="add-to-cart-sauce-labs-backpack"]'
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  // TODO 2: Click '[data-test="add-to-cart-sauce-labs-bike-light"]'
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  // TODO 3: Assert '.shopping_cart_badge' has text '2'
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');  

  // TODO 4: Click '[data-test="remove-sauce-labs-bike-light"]'
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  // TODO 5: Assert '.shopping_cart_badge' has text '1'
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// ✍️ EXERCISE 5 & 6: Full Checkout Flow + Intentional Failure Trace
test('Exercise 5 - complete checkout flow', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // TODO 1: Add backpack to cart and click '.shopping_cart_link'
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  // TODO 2: Click '[data-test="checkout"]'
  await page.locator('[data-test = "checkout"]').click();
  // TODO 3: Fill '[data-test="firstName"]', '[data-test="lastName"]', and '[data-test="postalCode"]'
  await page.locator('[data-test="firstName"]').fill('Stan')
  await page.locator('[data-test = "lastName"]').fill('User')
  await page.locator('[data-test="postalCode"]').fill('12345')
  // TODO 4: Click '[data-test="continue"]', then click '[data-test="finish"]'
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  // TODO 5: Assert '.complete-header' has text 'Thank you for your order!'
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')
});
