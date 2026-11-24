import { test, expect } from "@playwright/test";

test.describe("NS Coffee Landing Page Experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the brand logo with steaming cup and NS mark", async ({ page }) => {
    const logo = page.locator("header").getByLabel("NS Coffee Logo: Steaming artisanal coffee cup with NS brand mark");
    await expect(logo).toBeVisible();
    await expect(page.locator("header")).toContainText("NS COFFEE");
  });

  test("should display hero section with kinetic headline, floating coffee visual and corner metadata", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("CRAFTED FOR");
    await expect(heading).toContainText("THE OBSESSED");
    await expect(page.locator("#hero")).toContainText("2,150 MASL");

    // Verify open floating coffee and corner origin badge
    const heroVisual = page.locator("#hero img[alt*='NS Coffee open floating brew']");
    await expect(heroVisual).toBeVisible();
    await expect(page.locator("#hero")).toContainText("ETHIOPIA YIRGACHEFFE");
    await expect(page.locator("#hero")).toContainText("$6.50");
  });

  test("should filter coffee showcase by category tabs", async ({ page }) => {
    const roastsSection = page.locator("#roasts");
    await expect(roastsSection).toBeVisible();
    await expect(roastsSection).toContainText("Ethiopian Yirgacheffe G1");

    // Click "Slow Cold Drip" category tab
    await page.getByRole("button", { name: "Slow Cold Drip" }).click();
    await expect(roastsSection).toContainText("Kyoto 16-Hour Cold Drip");

    // Click "All Curations" tab
    await page.getByRole("button", { name: "All Curations" }).click();
    await expect(roastsSection).toContainText("Spanish Smoked Cortado");
  });

  test("should open cart drawer and allow checkout", async ({ page }) => {
    // Open cart drawer from header
    await page.getByRole("button", { name: /View your roastery order/i }).click();

    const drawer = page.getByRole("dialog", { name: "Your Roastery Order" });
    await expect(drawer).toBeVisible();

    // Confirm checkout button works and shows order dispatched
    const checkoutBtn = page.getByRole("button", { name: "Confirm & Brew Order" });
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    await expect(drawer).toContainText("ORDER DISPATCHED!");
  });

  test("should display special combo offers with discounts and auto-navigator controls", async ({ page }) => {
    const comboSection = page.locator("#combos");
    await expect(comboSection).toBeVisible();
    await expect(comboSection).toContainText("The Morning Ritual Combo");
    await expect(comboSection).toContainText("The Roaster's Tasting Flight");
    await expect(comboSection).toContainText("The Barista Reserve & Home Tin");

    // Verify left and right navigator buttons exist and work
    const nextBtn = page.getByRole("button", { name: "Next combo offer" });
    const prevBtn = page.getByRole("button", { name: "Previous combo offer" });
    await expect(nextBtn).toBeVisible();
    await expect(prevBtn).toBeVisible();

    // Verify stepper advances on click
    await nextBtn.click();
    await expect(comboSection).toContainText("02");
  });

  test("should provide interactive roast finder recommendations", async ({ page }) => {
    const guideSection = page.locator("#guide");
    await expect(guideSection).toBeVisible();

    // Click "Dark Cacao & Oak"
    await page.getByRole("button", { name: "Dark Cacao & Oak" }).click();
    await expect(guideSection).toContainText("100% SENSORY MATCH");
  });

  test("should maintain accessibility without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Verify header and hero are visible and responsive
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();

    // Check horizontal scroll overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 1-2px tolerance
  });
});
