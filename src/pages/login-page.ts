import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly errorMessage: Locator;
    public readonly greetingLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('label.form-label', { hasText: 'Помилка авторизації. Неправильний логін чи пароль' });
        this.greetingLink = page.locator('a.text-dark.nav-link', { hasText: 'Вітаю,' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
        await this.page.getByRole('link', { name: 'Увійти' }).click();
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async waitForSuccess(): Promise<void> {
        await this.greetingLink.waitFor({ state: 'visible', timeout: 10000 });
    }

    async waitForError(): Promise<void> {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    }
}
