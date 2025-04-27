import { Page, Locator } from '@playwright/test';

export class LoginPage {
    public constructor(public page: Page) {}

    public get emailInput(): Locator {
        return this.page.locator('#email');
    }
    public get passwordInput(): Locator {
        return this.page.locator('#password');
    }
    public get loginButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }
    public get errorMessage(): Locator {
        return this.page.locator('label.form-label', { hasText: 'Помилка авторизації. Неправильний логін чи пароль' });
    }
    public get greetingLink(): Locator {
        return this.page.locator('a.text-dark.nav-link', { hasText: 'Вітаю,' });
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
        await this.page.getByRole('link', { name: 'Увійти' }).click();
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    public async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    public async waitForSuccess(): Promise<void> {
        await this.greetingLink.waitFor({ state: 'visible', timeout: 10000 });
    }
    public async waitForError(): Promise<void> {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    }
}
