import { expect, test, type Page } from "@playwright/test";
import { createRandomUser, logUserIn, signUserUp, type User } from "./utils";

let page: Page;
let testUser: User;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  testUser = createRandomUser();
  await signUserUp({ page, user: testUser });
  await logUserIn({ page, user: testUser });
});

test.afterAll(async () => {
  await page.close();
});

// Login/Signup pages use useRedirectIfLoggedIn, which sends an
// already-authenticated visitor to /reports.
test.describe("auth redirect tests", () => {
  test("logged-in user visiting /login should redirect to /reports", async () => {
    // User is already logged in from beforeAll
    await page.goto("/login");

    await page.waitForURL("**/reports", { timeout: 5000 });
    expect(page.url()).toContain("/reports");
  });

  test("logged-in user visiting /signup should redirect to /reports", async () => {
    // User is already logged in from beforeAll
    await page.goto("/signup");

    await page.waitForURL("**/reports", { timeout: 5000 });
    expect(page.url()).toContain("/reports");
  });
});
