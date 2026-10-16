import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/login_Page"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/Product_Page"



test("Login to SauceDemo application with valid credential", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto(BASE_URL)
    await loginPage.login(USERNAME, PASSWORD)
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("Validating logout functionality", async ({ page }) => {
    const productPage = new ProductPage(page)
    await productPage.logout
})

test("Validating logout functionality", async ({ page }) => {

})