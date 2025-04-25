import { test, expect } from '@playwright/test';

test.describe('Navigation menu', () => {
    test('Home link navigates to main page and display correct info', async ({ page }) => {
        const brand = page.locator('a.navbar-brand');
        await page.goto('https://new.fophelp.pro/');
        await brand.click();
        await expect(page).toHaveURL('https://new.fophelp.pro/');
        const styleInfo = page.locator('li', { hasText: 'Bootstrap' });
        await expect(styleInfo).toBeVisible();
        await expect(styleInfo).toContainText('Bootstrap');
        await expect(styleInfo).toContainText('Material UI');
    });

    test('Register link navigates to correct page', async ({ page }) => {
        const brand = page.locator('a.navbar-brand');
        await page.goto('https://new.fophelp.pro/');
        await brand.click();
        const registerLink = page.getByRole('link', { name: 'Реєстрація' });
        await registerLink.click();
        await expect(page).toHaveURL(/\/auth\/register$/);
        const registerButton = page.getByRole('button', { name: 'Зареєструватися' });
        await expect(registerButton).toBeVisible();
        await expect(registerButton).toBeDisabled();
    });

    test('Login link navigates to correct page', async ({ page }) => {
        const brand = page.locator('a.navbar-brand');
        await page.goto('https://new.fophelp.pro/');
        await brand.click();
        const loginLink = page.getByRole('link', { name: 'Увійти' });
        await loginLink.click();
        await expect(page).toHaveURL(/\/auth\/login$/);
        const loginButton = page.getByRole('button', { name: 'Увійти' });
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toBeDisabled();
    });

    test('Side navigation displayed and navigates properly', async ({ page }) => {
        await page.goto('https://new.fophelp.pro/');
        const sidePanel = page.locator('div.grid-item.menu-background nav.side-navigation-panel');
        await expect(sidePanel).toBeVisible();
        const item = page.locator('span.side-navigation-panel-select-option-text', { hasText: 'Основи для розрахунку' });
        await item.click();
        await expect(page).toHaveURL(/\/GovSums$/);
        await expect(page.getByText('Client-side navigation')).toBeVisible();
        await expect(page.getByText('Development server integration')).toBeVisible();
        await expect(page.getByText('Efficient production builds')).toBeVisible();
    });
});
