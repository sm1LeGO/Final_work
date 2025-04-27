import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    public constructor(public page: Page) {}

    public get emailInput(): Locator {
        return this.page.locator('#formEmail');
    }
    public get passwordInput(): Locator {
        return this.page.locator('#formPassword');
    }
    public get confirmPasswordInput(): Locator {
        return this.page.locator('#formConfirmPassword');
    }
    public get vatCheckbox(): Locator {
        return this.page.locator('#formFopVat');
    }
    public get generalCheckbox(): Locator {
        return this.page.locator('#formFopGeneral');
    }
    public get groupSelect(): Locator {
        return this.page.locator('#formFopGroup');
    }
    public get registerButton(): Locator {
        return this.page.locator('button[type="submit"]', { hasText: 'Зареєструватися' });
    }
    public get successMessage(): Locator {
        return this.page.locator('h5');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
        const link = this.page.getByRole('link', { name: 'Реєстрація' });
        await Promise.all([
            link.click(),
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
