import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

let statePath: string;
let cookieHeader: string;

test.describe('Income API tests', () => {
    test.beforeAll(async ({ browser }) => {
        const uiContext = await browser.newContext();
        const page = await uiContext.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('ilya.kravecs@gmail.com', '123qwE#');
        await loginPage.waitForSuccess();

        await uiContext.request.get('https://new.fophelp.pro/api/auth/refresh', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        statePath = path.resolve(__dirname, '../../state.json');
        await uiContext.storageState({ path: statePath });

        const cookies = await uiContext.cookies();
        cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

        await uiContext.close();
    });

    test('POST request to add income', async ({ browser }) => {
        const context = await browser.newContext({ storageState: statePath });
        const page = await context.newPage();
        await page.waitForTimeout(1000);

        const newIncome = {
            Date: '2025-03-25T00:00:00',
            Income: '2000',
            Currency: 'EUR',
            Comment: 'API test',
            Cash: false
        };
        const response = await page.request.post('https://new.fophelp.pro/api/incomes/add', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'cookie': cookieHeader
            },
            data: newIncome
        });
        expect(response.status()).toBe(200);
        const rawText = await response.text();
        const message = JSON.parse(rawText);
        expect(message).toMatch(/^Successfully created income ID: [0-9a-fA-F\-]{36}$/);
        await context.close();
    });
});

test('GET request to find our income', async ({ browser }) => {
    const context = await browser.newContext({ storageState: statePath });
    const page = await context.newPage();
    await page.waitForTimeout(1000);

    const response = await page.request.get('https://new.fophelp.pro/api/incomes', {
        params: { year: '2025', month: '3' },
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'accept': 'application/json',
            'accept-encoding': 'gzip,deflate,br',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'cookie': cookieHeader
        }
    });
    expect(response.status()).toBe(200);

    const raw = await response.text();
    const inner = JSON.parse(raw);
    const data = JSON.parse(inner);

    expect(typeof data).toBe('object');
    expect(data).toHaveProperty('2025-3');
    const entries = data['2025-3'];
    expect(Array.isArray(entries)).toBe(true);
    if (entries.length > 0) {
        const entry = entries[0];
        expect(entry).toHaveProperty('ID');
        expect(entry).toHaveProperty('Date');
        expect(entry).toHaveProperty('Income');
        expect(entry).toHaveProperty('Currency');
        expect(entry).toHaveProperty('Comment');
    }

    await context.close();
});
