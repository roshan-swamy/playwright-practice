import { Page, Locator} from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test = "title"]');
    this.cartBadge = page.locator('[data-test = "shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test = "shopping-cart-link"]');
  }

  async addItemToCart(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test = "add-to-cart-${formattedName}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
