import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Папка с тестами
    testDir: 'src',  // тесты теперь находятся в папке src

    // Таймаут для каждого теста
    timeout: 30_000,

    // Перезапуск упавших тестов на CI
    retries: process.env.CI ? 2 : 0,

    // Генерация отчётов
    reporter: [
        ['list'],               // вывод в консоль
        ['allure-playwright']  // сбор данных для Allure
    ],

    use: {
        baseURL: 'https://new.fophelp.pro',  // базовый URL для page.goto('/')
        headless: true,                       // без GUI
        screenshot: 'only-on-failure',        // скриншоты только при падении
        video: 'retain-on-failure',           // видео только при падении
        trace: 'on-first-retry'              // трассировка при первом релоаде
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
