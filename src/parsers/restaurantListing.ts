import { Page } from "puppeteer";
import { getCheerio, getClass } from ".";

export const getDeliverySpanEl = async (page: Page): Promise<string> => {
  const $ = await getCheerio(page);
  // TODO: Remove this
  //   $("span").each((_, el) => {
  //     console.log("text:", $(el).text());
  //     // console.log($(el));
  //   });
  const deliverySpan = $("span").filter(
    (_, el) => $(el).text() === "Type your location"
  )[0];
  console.log(deliverySpan);
  return getClass($(deliverySpan));
};
