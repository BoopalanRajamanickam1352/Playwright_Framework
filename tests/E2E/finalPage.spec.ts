import { expect, test } from "@playwright/test"
import { LoginPage } from "../../pages/login_Page"
import { ProductPage } from "../../pages/Product_Page"
import { CartPage } from "../../pages/cart_Page"
import { CheckoutPage } from "../../pages/checkout_Page"
import { CheckoutOverviewPage } from "../../pages/checkoutOverviewPage"
import { BASE_URL, PASSWORD, USERNAME } from "../../utils/envConfig"
import { checkoutData } from "../../test-data/checkoutData"
import { checkoutOverviewLocators } from "../../locators/checkoutOverview_Locators"
import { FinalPage } from "../../pages/final_Page"

test.describe("final page validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverviewPage: CheckoutOverviewPage
    let finalPage: FinalPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        finalPage = new FinalPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.cartButtonClick()
        await cartPage.getFirstProductDetails()
        await cartPage.checkoutCartPage()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.continueButton()
        await checkoutOverviewPage.clickOnFinish()
    })

    test("validate checkout overview page UI and URL 1", async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
        const elements = await finalPage.getFinalPageElements()
        expect(elements.backHomeButton).toBeVisible()
        expect(elements.pageInfo).toBeVisible()
        expect(elements.successMsg).toBeVisible()
    })

    test("validate Suceess message 2", async ({ page }) => {
        const text = await finalPage.getSuccessMessage()
        expect(text).toBe("Thank you for your order!")
    })

    test("validate back home button 3", async ({ page }) => {
        await finalPage.clickOnBackHomeButton()
        await page.waitForTimeout(2000)
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })


})