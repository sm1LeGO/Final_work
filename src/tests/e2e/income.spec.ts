import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { IncomePage } from '../../pages/income-page';

test.describe('Income page tests', () => {
    const COMMENT = 'test';

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('ilya.kravecs@gmail.com', '123qwE#');
        await page.waitForURL('**/incomes');
    });

    test('should add new income', async ({ page }) => {
        const incomePage = new IncomePage(page);
        await incomePage.goto();
        await incomePage.openAddForm();
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        await incomePage.fillAndSubmit(formatted, '1500', 'EUR', COMMENT);
        const row = page.locator('tr', { hasText: COMMENT }).first();
        await expect(row).toBeVisible();
        await expect(row).toContainText('1500');
        await expect(row).toContainText('EUR');
        await page.screenshot({ path: 'screenshots/income-added.png', fullPage: true });
    });

    test('should delete income', async ({ page }) => {
        const incomePage = new IncomePage(page);
        await incomePage.goto();
        await incomePage.deleteByComment(COMMENT);
        const rows = page.locator('table.MuiTable-root tbody tr');
        await expect(rows).toHaveCount(0);
        await page.screenshot({ path: 'screenshots/income-removed.png', fullPage: true });
    });
});
