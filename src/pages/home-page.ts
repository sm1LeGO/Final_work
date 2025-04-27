import { Page, Locator } from '@playwright/test';

export class HomePage {
    public constructor(public page: Page) {}

    public get header(): Locator {
        return this.page.locator('h1');
    }
    public get servicesList(): Locator {
        return this.page.locator('ul.services');
    }
    public get serviceItems(): Locator {
        return this.page.locator('ul.services > li');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
        await this.header.waitFor({ state: 'visible' });
    }
    public async getHeaderText(): Promise<string> {
        return (await this.header.textContent()) ?? '';
    }
    public async getServicesCount(): Promise<number> {
        return await this.serviceItems.count();
    }
    public async getServiceName(index: number): Promise<string> {
        return (await this.serviceItems.nth(index).textContent()) ?? '';
    }
}
