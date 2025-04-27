import { test, expect } from '@playwright/test';
import { LoginPage } from 'src/pages/login-page';

test.describe('Login page UI tests', () => {
    test('user can login and sees greeting link', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('ilya.kravecs@gmail.com', '123qwE#');

        const greetingLink = page.getByRole('link', { name: /Вітаю, ilya\.kravecs@gmail\.com/ });
        await expect(greetingLink).toBeVisible();
        await expect(page).toHaveURL(/.*\/incomes$/);
        await page.waitForTimeout(1000); // introduce waiting, because found an issue in webSite it displays incorrect state
        await page.screenshot({ path: 'screenshots/login-success.png', fullPage: true });
    });

    test('user see error for invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('ilya.kravecs@gmail.com', 'wrongpass');
        await loginPage.waitForError();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Помилка авторизації. Неправильний логін чи пароль');
        await expect(page).toHaveURL(/.*\/auth\/login$/);
    });
});
