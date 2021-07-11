import express, { Application, Request, Response } from "express";
import { crawlRestaurants } from "./crawl";

const app: Application = express();

app.get("/", async (req: Request, res: Response) => {
  crawlRestaurants("https://food.grab.com/ph/en/restaurants");
  res.send("Well done!");
});

app.listen(5000, () => {
  console.log("The application is listening on port 5000!");
});
