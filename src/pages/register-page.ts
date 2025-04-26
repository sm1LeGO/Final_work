import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    public page: Page;
    public emailInput: Locator;
    public passwordInput: Locator;
    public confirmPasswordInput: Locator;
    public vatCheckbox: Locator;
    public generalCheckbox: Locator;
    public groupSelect: Locator;
    public registerButton: Locator;
    public successMessage: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#formEmail');
        this.passwordInput = page.locator('#formPassword');
        this.confirmPasswordInput = page.locator('#formConfirmPassword');
        this.vatCheckbox = page.locator('#formFopVat');
        this.generalCheckbox = page.locator('#formFopGeneral');
        this.groupSelect = page.locator('#formFopGroup');
        this.registerButton = page.locator('button[type="submit"]', { hasText: 'Зареєструватися' });
        this.successMessage = page.locator('h5');
    }
    public async goto(): Promise<void> {
        await this.page.goto('https://new.fophelp.pro/');
        const registerLink = this.page.getByRole('link', { name: 'Реєстрація' });
        await Promise.all([
            registerLink.click(),
            this.page.waitForURL('**/auth/register')
        ]);
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    public async register(email: string, password: string, confirm: string, vat = false, general = false, group = '1'): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirm);
        if (vat) await this.vatCheckbox.check();
        if (general) await this.generalCheckbox.check();
        await this.groupSelect.selectOption(group);
        await this.registerButton.click();
    }
    public async waitForSuccessMessage(): Promise<void> {
        await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    }
}
