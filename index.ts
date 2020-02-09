import { config } from "dotenv";
import { readFile } from "fs-extra";
import { load } from "js-yaml";
import { join } from "path";
import { launch, Page } from "puppeteer";

config();

export const archive = async () => {
  console.log("⏳ Starting archiving process...");
  const yarn = await readFile(join(__dirname, "..", "urls.yml"));
  const urls: string[] = load(yarn.toString());
  const browser = await launch();
  const page = await browser.newPage();
  await login(page);
  // for await (const url of urls) {
  //   await archiveUrl(url, page);
  //   console.log("✅", url);
  // }
  // await browser.close();
  // console.log("✅ Archived all pages");
};

const login = async (page: Page) => {};

const archiveUrl = async (url: string, page: Page) => {
  await page.goto("https://web.archive.org/save");
  await page.type("input#web-save-url-input", url, { delay: 20 });
};
