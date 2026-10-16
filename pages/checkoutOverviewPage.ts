import { checkoutOverviewLocators } from "../locators/checkoutOverview_Locators";
import { Page } from "@playwright/test";
import { CartPage } from "./cart_Page";
import { cartPageLocators } from "../locators/cartPage_Locators";

export class CheckoutOverviewPage {
    constructor(private page: Page) { }

    async getCheckoutOverviewElements() {
        return {
            pageInfo: await this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton: await this.page.locator(checkoutOverviewLocators.cancelbutton),
            finishButton: await this.page.locator(checkoutOverviewLocators.finishButton)

        }
    }

    async getOverviewProducts() {
        const allNames = await this.page.locator(cartPageLocators.productName).allTextContents()
        const allDescription = await this.page.locator(cartPageLocators.productDescription).allTextContents()
        const allPrice = await this.page.locator(cartPageLocators.productPrice).allTextContents()

        const allCartProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrice[i].trim()
        }))
        return allCartProducts;

    }

    async getItemTotal() {
        const itemTotal = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent()
        return parseFloat(itemTotal!.trim().replace("Item total: $", " "));

    }

    async getTax() {
        const itemTax = await this.page.locator(checkoutOverviewLocators.tax).textContent()
        return parseFloat(itemTax!.trim().replace("Tax: $", " "));

    }

    async getGrandTotal() {
        const grandTotal = await this.page.locator(checkoutOverviewLocators.total).textContent()
        return parseFloat(grandTotal!.trim().replace("Total: $", " "));

    }

    async clickOnCancel() {
        await this.page.locator(checkoutOverviewLocators.cancelbutton).click()
    }

    async clickOnFinish() {
        await this.page.locator(checkoutOverviewLocators.finishButton).click()
    }
}