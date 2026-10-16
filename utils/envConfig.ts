//export const BASE_URL = "https://www.saucedemo.com/inventory.html"

const ENV_URL = {
    dev: "https://www.saucedemo.com/inventory.html",
    qa: "https://www.saucedemo.com/inventory.html",
    staging: "https://www.saucedemo.com/inventory.html",
    prod: "https://www.saucedemo.com/inventory.html",
};

const ENV = process.env.ENV || "prod"
export const BASE_URL = (ENV_URL as any)[ENV]

export const USERNAME = "standard_user"
export const PASSWORD = "secret_sauce"