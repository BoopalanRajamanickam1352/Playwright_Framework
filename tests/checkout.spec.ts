import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/login_Page"
import { ProductPage } from "../pages/Product_Page"
import { CartPage } from "../pages/cart_Page"
import { CheckoutPage } from "../pages/checkout_Page"
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig"
import { checkoutData } from "../test-data/checkoutData"

test.describe("checkout page validation", () => {
    let logingPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage

    test.beforeEach(async ({ page }) => {
        logingPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await page.goto(BASE_URL)
        await logingPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.cartButtonClick()
        await cartPage.getFirstProductDetails()
        await cartPage.checkoutCartPage()
    })

    test("validating checkout elements", async ({ page }) => {

        const elements = await checkoutPage.getCheckoutElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.cancelButton).toBeVisible()
        await expect(elements.continueButton).toBeVisible()

    })

    test("validating cancel button", async ({ page }) => {
        await checkoutPage.clickCancel()
        expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    })

    test("validate continue button", async ({ page }) => {
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.continueButton()
    })

    test.only("validate error message", async ({ page }) => {
        await checkoutPage.continueButton()
        expect(await checkoutPage.errorMessage()).toBe("Error: First Name is required")
    })

})
