import { Page } from "puppeteer";
import * as cheerio from "cheerio";

export const getCheerio = async (page: Page) => {
  let html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  return $;
};

export const getEl = async (page: Page) => {
  const $ = await getCheerio(page);
};

export const getClass = (el: cheerio.Cheerio<cheerio.Element>): string => {
  console.log(el.attr("class"));
  return el.attr("class") || "";
};

export const getParentEl = async (
  page: Page,
  selector: string
): Promise<cheerio.Cheerio<cheerio.Element>> => {
  const $ = await getCheerio(page);
  const parentEl = $(selector).parent();
  return parentEl;
};
