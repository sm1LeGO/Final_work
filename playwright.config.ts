import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'src',

    timeout: 30_000,

    retries: process.env.CI ? 2 : 0,

    reporter: [
        ['list'],
        ['allure-playwright']
    ],

    use: {
        baseURL: 'https://new.fophelp.pro',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
