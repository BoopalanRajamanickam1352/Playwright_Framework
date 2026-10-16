import { productPageLocators } from "../locators/ProductPage_Locators";
import { ProductPage } from "../pages/Product_Page";
import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { LoginPage } from "../pages/login_Page";
import { loginLocators } from "../locators/login_Locators";
import { productsToCart } from "../test-data/products"
import { CartPage } from "../pages/cart_Page";

test.describe("product page validation", () => {
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        await page.goto(BASE_URL)
        await loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("valdate logout functionality", async ({ page }) => {
        await productPage.logout()
        await expect(page.locator(loginLocators.loginButton)).toBeVisible()
    })

    test("validate about page and navigate back", async ({ page }) => {
        await productPage.openAboutPage()
        await page.click(productPageLocators.closeButton)
        //        await page.waitForTimeout(2000)
        await expect(page).toHaveTitle("Sauce Labs: AI-Unified Release Assurance Platform")
        await page.goBack()
        await expect(page.locator(productPageLocators.settingIcon)).toBeVisible()
    })

    test("validate product page", async ({ page }) => {
        await productPage.validateProductDisplay();
        await productPage.addFirstProductToCart();
        const count = await page.locator(productPageLocators.cartCount).innerText()
        expect(count).toBe("1")
        await productPage.addAllProductToCart();
    })

    test("validate adding specific product to cart", async ({ page }) => {
        await productPage.addSpecificProductsToCart(productsToCart);
    })

    test("Filter By Name A to Z", async ({ page }) => {
        await productPage.filterByNameAtoZ();
        const names = await productPage.getProductNames()
        const sorted = [...names].sort()
        expect(names).toEqual(sorted)
    })

    test("Filter By Name Z to A", async ({ page }) => {
        await productPage.filterByNameZtoA();
        const names = await productPage.getProductNames()
        const sorted = [...names].sort().reverse()
        expect(names).toEqual(sorted)
    })

    test("Filter By Name Low to High", async ({ page }) => {
        await productPage.filterByPriceLowtoHigh()
        const pricelist = await productPage.getProductPrice()
        const sorted = [...pricelist].sort((a, b) => a - b)
        expect(pricelist).toEqual(sorted)
    })

    test("Filter By Name High to Low", async ({ page }) => {
        await productPage.filterByPriceHightoLow()
        const pricelist = await productPage.getProductPrice()
        const sorted = [...pricelist].sort((a, b) => b - a)
        expect(pricelist).toEqual(sorted)
    })
})