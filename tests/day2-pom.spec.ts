import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sauce Demo POM Tests', () => {

  test('should login and add an item to cart using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toHaveText('Products')

    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should show error on invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('user has been locked out');
  });

});
