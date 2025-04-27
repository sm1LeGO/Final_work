import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 30 * 1000,
    retries: 0,
    reporter: [
        ['list'],
        ['allure-playwright', {
            outputFolder: 'allure-results',
            detail: true
        }]
    ],
    projects: [
        {
            name: 'ui',
            testDir: 'src/tests/e2e',
            timeout: 30 * 1000,
            use: {
                baseURL: 'https://new.fophelp.pro',
                headless: true,
                viewport: { width: 1280, height: 720 },
                screenshot: 'only-on-failure',
                trace: 'on-first-retry'
            }
        },
        {
            name: 'api',
            testDir: 'src/tests/api',
            timeout: 30 * 1000,
            use: {
                baseURL: 'https://new.fophelp.pro',
                extraHTTPHeaders: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        }
    ]
});
