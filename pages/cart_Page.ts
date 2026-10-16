import { Page } from "@playwright/test"
import { cartPageLocators } from "../locators/cartPage_Locators"
import { ProductPage } from "./Product_Page";
import { productPageLocators } from "../locators/ProductPage_Locators";

export class CartPage {
    constructor(private page: Page) { }

    async clickOnContinueShopping() {
        await this.page.locator(cartPageLocators.continueShoppingButton).click();
    }

    async getCartPgeElements() {
        return {
            cartTitle: await this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: await this.page.locator(cartPageLocators.continueShoppingButton),
            checkoutButton: await this.page.locator(cartPageLocators.checkoutButton)
        }
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(productPageLocators.productName).first().textContent()
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent()
        const price = await this.page.locator(productPageLocators.productPrice).first().textContent()

        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }
    }

    async getCartAllProducts() {
        const allnames = await this.page.locator(productPageLocators.productName).allTextContents()
        const alldescription = await this.page.locator(productPageLocators.productDescription).allTextContents()
        const allprice = await this.page.locator(productPageLocators.productPrice).allTextContents()

        const allproducts = allnames.map((_, i) => {
            name: allnames[i].trim();
            description: alldescription[i].trim();
            price: allprice[i].trim()
        })
        return allproducts;
    }

    async getSpecificProductDetails(productName: string[]) {
        const allnames = await this.page.locator(productPageLocators.productName).allTextContents()
        const alldescription = await this.page.locator(productPageLocators.productDescription).allTextContents()
        const allprice = await this.page.locator(productPageLocators.productPrice).allTextContents()

        const allproducts = allnames.map((_, i) => ({
            name: allnames[i].trim(),
            description: alldescription[i].trim(),
            price: allprice[i].trim()
        }))
        return allproducts.filter(p => productName.includes(p.name));
    }

    async removeProductCartPage(productsToCart: string[]) {
        for (const productName of productsToCart) {
            const product = this.page.locator(".cart_item").filter({
                has: this.page.getByText(productName, { exact: true })
            });

            await product.getByRole("button", { name: "Remove" }).click();
        }
    }

    async checkoutCartPage() {
        await this.page.locator(cartPageLocators.checkoutButton).click()
    }

}    
