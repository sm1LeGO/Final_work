import { Page, Locator, expect } from '@playwright/test';

export class IncomePage {
    public readonly page: Page;
    public readonly addButton: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.addButton = page.getByTitle('Додати новий дохід');
    }
    public async goto(): Promise<void> {
        await this.page.goto('https://new.fophelp.pro/incomes', { waitUntil: 'networkidle' });
    }
    public async openAddForm(): Promise<void> {
        await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addButton.click();
        await this.page.waitForSelector('td.table-date input[type="date"]', {
            state: 'visible', timeout: 10000
        });
    }
    public async fillAndSubmit(
        date: string,
        amount: string,
        currency: string,
        comment: string
    ): Promise<void> {
        await this.page.fill('td.table-date input[type="date"]', date);
        await this.page.fill('td.table-income input[type="text"]', amount);
        await this.page.selectOption('td select', currency);
        await this.page.fill('td.table-comment input[type="text"]', comment);
        await this.page.click('button#BtnAdd-New');
        const row = this.page.locator('tr', { hasText: comment }).first();
        await expect(row).toBeVisible();
    }
    public async deleteByComment(comment: string): Promise<void> {
        const row = this.page.locator('tr', { hasText: comment }).first();
        await row.waitFor({ state: 'visible', timeout: 10000 });
        const deleteBtn = row.locator('button[title="Видалити"]');
        await deleteBtn.click();
        await expect(row).not.toBeVisible();
    }
}
