import { test, expect } from '@playwright/test';
import { RegisterPage } from 'src/pages/register-page';

test('user can register new account and sees success message', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  const uniqueEmail = `testuser+${Date.now()}@example.com`;
  await registerPage.register(uniqueEmail, 'Password1!', 'Password1!', true, false, '2');
  await registerPage.waitForSuccessMessage();
  await expect(registerPage.successMessage).toHaveText(
    'Користувач успішно зареєстрований. На вашу електронну адресу надіслано лист з підтвердженням реєстрації'
  );
  await page.screenshot({ path: 'screenshots/register-success.png', fullPage: true });
});
