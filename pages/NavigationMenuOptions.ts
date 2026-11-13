import { Page, Locator } from '@playwright/test';

export class NavigationMenuOptions {
  readonly page: Page;
  readonly burgerButton: Locator;
  readonly optionAllItems: Locator;
  readonly optionDynamicCatalog: Locator;
  readonly optionAbout: Locator;
  readonly optionLogout: Locator;
  readonly optionResetAppState: Locator;
}

constructor(page: Page) {
  this.page = page;
  this.burgerButton = page.getByRole('button', {name: 'Open Menu'})
  
}
