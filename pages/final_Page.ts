import { Page } from "@playwright/test"
import { finalPageLocators } from "../locators/finalPage_Locators"
export class FinalPage {
    constructor(private page: Page) {

    }

    async getFinalPageElements() {
        return {
            pageInfo: this.page.locator(finalPageLocators.pageInfo),
            successMsg: this.page.locator(finalPageLocators.successMsg),
            backHomeButton: this.page.locator(finalPageLocators.backHomeBtn)
        }
    }

    async getSuccessMessage() {
        return this.page.locator(finalPageLocators.successMsg).textContent()
    }

    async clickOnBackHomeButton() {
        return this.page.locator(finalPageLocators.backHomeBtn).click()
    }
}