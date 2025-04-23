import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly servicesList: Locator;
  readonly serviceItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1');
    this.servicesList = page.locator('ul.services');
    this.serviceItems = page.locator('ul.services > li');
  }
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.header.waitFor();
  }
  async getHeaderText(): Promise<string> {
    return await this.header.textContent() ?? '';
  }
  async getServicesCount(): Promise<number> {
    return await this.serviceItems.count();
  }
  async getServiceName(index: number): Promise<string> {
    return await this.serviceItems.nth(index).textContent() ?? '';
  }
}
