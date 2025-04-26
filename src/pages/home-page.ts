import { Page, Locator } from '@playwright/test';

export class HomePage {
    public readonly page: Page;
    public readonly header: Locator;
    public readonly servicesList: Locator;
    public readonly serviceItems: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.header = page.locator('h1');
        this.servicesList = page.locator('ul.services');
        this.serviceItems = page.locator('ul.services > li');
    }
    public async goto(): Promise<void> {
        await this.page.goto('/');
        await this.header.waitFor();
    }
    public async getHeaderText(): Promise<string> {
        return await this.header.textContent() ?? '';
    }
    public async getServicesCount(): Promise<number> {
        return await this.serviceItems.count();
    }
    public async getServiceName(index: number): Promise<string> {
        return await this.serviceItems.nth(index).textContent() ?? '';
    }
}
