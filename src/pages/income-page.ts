import { Page, Locator } from '@playwright/test';

export class IncomePage {
    public constructor(public page: Page) {}

    public get addButton(): Locator {
        return this.page.getByTitle('Додати новий дохід');
    }
    public get dateInput(): Locator {
        return this.page.locator('td.table-date input[type="date"]');
    }
    public get amountInput(): Locator {
        return this.page.locator('td.table-income input[type="text"]');
    }
    public get currencySelect(): Locator {
        return this.page.locator('td select');
    }
    public get commentInput(): Locator {
        return this.page.locator('td.table-comment input[type="text"]');
    }
    public get tableRows(): Locator {
        return this.page.locator('table.MuiTable-root tbody tr');
    }
    public async goto(): Promise<void> {
        await this.page.goto('/incomes', { waitUntil: 'networkidle' });
    }
    public async openAddForm(): Promise<void> {
        await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addButton.click();
        await this.dateInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    public async fillAndSubmit(date: string, amount: string, currency: string, comment: string): Promise<void> {
        await this.dateInput.fill(date);
        await this.amountInput.fill(amount);
        await this.currencySelect.selectOption(currency);
        await this.commentInput.fill(comment);
        await this.page.click('#BtnAdd-New');
    }
    public async deleteByComment(comment: string): Promise<void> {
        const row = this.page.locator('table.MuiTable-root tbody tr', { hasText: comment }).first();
        const deleteBtn = row.locator('button[title="Видалити"]');
        await deleteBtn.click();
    }
}
