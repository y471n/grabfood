import { Page } from "puppeteer";
import { getCheerio, getClass, getParentEl } from "../parsers";

export const clickSelector = async (selector: string, page: Page) => {
  let isClicked = false;
  let elementHandle = await page.$(selector);

  while (!isClicked) {
    try {
      console.info("Clicking: ", selector);
      elementHandle?.click();
      isClicked = true;
      console.log("Clicked Successfully!");
    } catch (e) {
      console.warn(e);
      let parentEls = await elementHandle?.$x("..");
      elementHandle = parentEls ? parentEls[0] : null;
      // selector = `.${getClass(parentEl)}`;
    }
  }
};
