//constructor : Runs when you create an object using new.
//private page : Stores the received page as a property that can be used inside the class.
//: Page : Tells TypeScript that page must be a Playwright Page object.

import { Page } from "@playwright/test"
import { productPageLocators } from "../locators/ProductPage_Locators"

export class ProductPage {
    constructor(private page: Page) { }

    async logout() {
        await this.page.click(productPageLocators.settingIcon)
        await this.page.click(productPageLocators.logoutLink)
    }

    async openAboutPage() {
        await this.page.click(productPageLocators.settingIcon)
        await this.page.click(productPageLocators.aboutLink)
    }

    async validateProductDisplay() {
        const name = await this.page.locator(productPageLocators.productName).allTextContents()
        const description = await this.page.locator(productPageLocators.productDescription).allTextContents()
        const price = await this.page.locator(productPageLocators.productPrice).allTextContents()
        const buttonCount = await this.page.locator(productPageLocators.addToCartButton).allTextContents()

        if (name.length === 0)
            throw new Error("No Products Found")

        if (name.length !== description.length || name.length !== price.length || name.length !== buttonCount.length)
            throw new Error("Mismatch between product details")

    }

    async addFirstProductToCart() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.locator(productPageLocators.addToCartButton).first().click()
    }

    async addAllProductToCart() {
        const buttons = this.page.locator(productPageLocators.addToCartButton)
        const count = await buttons.count()
        console.log(count)

        for (let i = 0; i < count; i++) {
            await buttons.nth(i).click()
            await this.page.waitForTimeout(1000)
        }
    }

    async addSpecificProductsToCart(productsName: string[]) {
        const addProduct = await this.page.locator(productPageLocators.productName)
        const count = await addProduct.count()
        for (let i = 0; i < count; i++) {
            const name = await addProduct.nth(i).textContent()
            if (name && productsName.includes(name.trim())) {
                await this.page.locator(productPageLocators.addToCartButton).nth(i).click();
                await this.page.waitForTimeout(2000)
            }

        }
    }

    async filterByNameAtoZ() {
        await this.page.selectOption(productPageLocators.filterDropdown, "az")
    }

    async filterByNameZtoA() {
        await this.page.selectOption(productPageLocators.filterDropdown, "za")
    }

    async filterByPriceLowtoHigh() {
        await this.page.selectOption(productPageLocators.filterDropdown, "lohi")
    }

    async filterByPriceHightoLow() {
        await this.page.selectOption(productPageLocators.filterDropdown, "hilo")
    }

    async getProductNames() {
        return await this.page.locator(productPageLocators.productName).allTextContents()
    }

    async getProductPrice() {
        const price = await this.page.locator(productPageLocators.productPrice).allTextContents()
        return price.map(price => parseFloat(price.replace('$', ' ')));
    }

    async cartButtonClick() {
        await this.page.locator(productPageLocators.cartButton).click()
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

    async getAllProductDetails() {
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

}

