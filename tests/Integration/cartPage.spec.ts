import { cartPageLocators } from "../locators/cartPage_Locators";
import { CartPage } from "../pages/cart_Page";
import { test, expect } from "@playwright/test"
import { ProductPage } from "../pages/Product_Page";
import { LoginPage } from "../pages/login_Page";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { productsToCart } from "../test-data/products"

test.describe("Cart page validation", () => {
    let cartPage: CartPage
    let productPage: ProductPage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        cartPage = new CartPage(page)
        await page.goto(BASE_URL)
        loginPage.login(USERNAME, PASSWORD)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("validate cart page URL and UI elements", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.cartButtonClick();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = await cartPage.getCartPgeElements()
        expect((await ui).cartTitle).toBeVisible()
        expect((await ui).shoppingCart).toBeVisible()
        expect(ui.checkoutButton).toBeVisible()

    })

    test("validate continue shopping functionality", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.cartButtonClick();
        await cartPage.clickOnContinueShopping();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    })

    test("validate First product in the cart page", async ({ page }) => {
        const firstProduct = await productPage.getFirstProductDetails()
        const price = await firstProduct.price
        await productPage.addFirstProductToCart()
        await productPage.cartButtonClick()
        const firstProductCart = await cartPage.getFirstProductDetails()
        const priceCart = firstProductCart.price
        expect(price).toBe(priceCart)
        expect(firstProduct).toEqual(firstProductCart)
    })

    test("validate all product in the cart page", async ({ page }) => {
        const allProduct = await productPage.getAllProductDetails()
        console.log(allProduct)
        await productPage.addAllProductToCart()
        await productPage.cartButtonClick()
        const allProductCart = await cartPage.getCartAllProducts()
        console.log(allProductCart)
        expect(allProduct).toEqual(allProductCart)

    })

    test("validate specific product in the cart page", async ({ page }) => {
        const addSpecificProduct = await productPage.getSpecificProductDetails(productsToCart)
        await productPage.addSpecificProductsToCart(productsToCart)
        await productPage.cartButtonClick()
        await page.waitForTimeout(5000)
        const addSpecificProductCart = await cartPage.getSpecificProductDetails(productsToCart)
        expect(addSpecificProduct).toEqual(addSpecificProductCart)

    })

    test.only("validate remove product in the cart page", async ({ page }) => {
        await productPage.addAllProductToCart()
        await productPage.cartButtonClick()
        const allProductCount = await (await cartPage.getCartAllProducts())
        console.log(`Length: ${allProductCount.length}`)
        await cartPage.removeProductCartPage(productsToCart)
        const allProductCountFinal = await cartPage.getCartAllProducts()
        console.log(`Length: ${allProductCountFinal.length}`)
        expect(allProductCount.length).toBe(allProductCountFinal.length + 3)

    })


})