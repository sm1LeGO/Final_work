import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';

test.describe('Home page UI tests', () => {
    test('header is visible', async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
        await expect(home.header).toBeVisible();
    });
});
