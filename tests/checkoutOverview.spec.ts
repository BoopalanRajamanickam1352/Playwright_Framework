import { expect, test } from "@playwright/test"
import { LoginPage } from "../pages/login_Page"
import { ProductPage } from "../pages/Product_Page"
import { CartPage } from "../pages/cart_Page"
import { CheckoutPage } from "../pages/checkout_Page"
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage"
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig"
import { checkoutData } from "../test-data/checkoutData"
import { checkoutOverviewLocators } from "../locators/checkoutOverview_Locators"

test.describe("checkout overview validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverviewPage: CheckoutOverviewPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        await productPage.addFirstProductToCart()
        await productPage.cartButtonClick()
        await cartPage.getFirstProductDetails()
        await cartPage.checkoutCartPage()
        console.log("start")
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.continueButton()
    })

    test("checkout overview page info", async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")
        const elements = await checkoutOverviewPage.getCheckoutOverviewElements()
        await expect(elements.pageInfo).toBeVisible()
        await expect(elements.cancelButton).toBeVisible()
        await expect(elements.finishButton).toBeVisible()
    })

    test("validate cancel button functionality", async ({ page }) => {
        await page.locator(checkoutOverviewLocators.cancelbutton).click()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("validate Item total functionality", async ({ page }) => {
        const overviewProduct = await checkoutOverviewPage.getOverviewProducts()
        const calculateTotal = overviewProduct.reduce((sum, { price }) => sum + parseFloat(price.replace("$", "").trim()), 0)
        console.log(calculateTotal)
        const uiItemTotal = await checkoutOverviewPage.getItemTotal()
        console.log(uiItemTotal)
        expect(String(calculateTotal)).toBe(uiItemTotal)
    })

    test("validate final total(Item Total + Tax)", async ({ page }) => {
        const ItemTotal = await checkoutOverviewPage.getItemTotal()
        const ItemTax = await checkoutOverviewPage.getTax()
        const Total = ItemTotal + ItemTax;
        const TotalResult = await checkoutOverviewPage.getGrandTotal()
        expect(TotalResult).toBe(Total)

    })

    test.only("click on checkoutOverview Finish", async ({ page }) => {
        await checkoutOverviewPage.clickOnFinish()
    })





})