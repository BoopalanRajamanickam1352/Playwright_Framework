import { Page } from "@playwright/test"
import { checkoutLocators } from "../locators/checkoutPage_Locators"


export class CheckoutPage {
    constructor(private page: Page) { }

    async getCheckoutElements() {
        return {
            pageInfo: this.page.locator(checkoutLocators.pageInfo),
            cancelButton: this.page.locator(checkoutLocators.cancelButton),
            continueButton: this.page.locator(checkoutLocators.continueButton)
        }
    }

    async fillCheckoutDetails(firstname: string, lastname: string, postalcode: string) {
        await this.page.fill(checkoutLocators.firstName, firstname);
        await this.page.fill(checkoutLocators.lastName, lastname);
        await this.page.fill(checkoutLocators.postalCode, postalcode);

    }

    async clickCancel() {
        await this.page.locator(checkoutLocators.cancelButton).click()
    }

    async continueButton() {
        await this.page.locator(checkoutLocators.continueButton).click()
    }

    async errorMessage() {
        return await this.page.locator(checkoutLocators.errorMessage).textContent()
    }
} 