import { Page } from "puppeteer";
import { getDeliverySpanEl } from "../parsers/restaurantListing";
import { clickSelector } from "./utils";

const puppeteer = require("puppeteer");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const crawlRestaurants = async (url: string) => {
  url = "https://food.grab.com/ph/en/restaurants";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );
  //   await page.setViewport({ width: 350, height: 700 });
  //   await page.setDefaultNavigationTimeout(0);

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  await page.setRequestInterception(true);
  page.on("response", (interceptedResponse: any) => {
    console.log(interceptedResponse);
  });
  await page.evaluate(() => {
    window.scrollBy(0, 850);
  });

  await sleep(5000);

  // Click the Location Thing
  await (
    await page.$x('//div[contains(@class, "headerMainAddressCol")]')
  )[0].click();
  await sleep(10000);

  // Enter in the Search Input
  await page.type("#location-input", "AAP", { delay: 500 });

  await sleep(10000);

  await page.keyboard.press("Enter");

  await sleep(10000);
  await page.screenshot({ path: "example.png" });
  //   await browser.close();
};
