import { config } from "dotenv";
import { readFile } from "fs-extra";
import { load } from "js-yaml";
import { join } from "path";
import { launch, Page } from "puppeteer";

config();
const username = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";

export const archive = async () => {
  console.log("⏳  Starting archiving process...");
  const yarn = await readFile(join(__dirname, "..", "urls.yml"));
  const urls: string[] = load(yarn.toString());
  const browser = await launch();
  const page = await browser.newPage();
  await login(page);
  for await (const url of urls) {
    const archivedUrl = await archiveUrl(url, page);
    console.log("✅ ", archivedUrl);
  }
  await page.goto("https://archive.org/account/logout");
  await browser.close();
  console.log("✅  Archived all pages");
  process.exit(0);
};

const login = async (page: Page) => {
  console.log("⏳  Logging in to archive.org...");
  await page.goto("https://archive.org/account/login");
  await page.type(".login-form input[type=email]", username, { delay: 20 });
  await page.type(".login-form input[type=password]", password, { delay: 20 });
  await page.click(".login-form input[type=submit]");
  await page.waitForNavigation();
  console.log("✅  Logged in");
};

const wait = (time: number) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

const archiveUrl = async (url: string, page: Page) => {
  console.log("⏳  Archiving", url);
  await page.goto("https://web.archive.org/save");
  await page.type(".web-save-form input#web-save-url-input", url, {
    delay: 20
  });
  await page.$$eval(".web-save-form input[type=checkbox]", checks =>
    checks.forEach((c, i) => {
      if (i !== checks.length - 1)
        (c as HTMLInputElement).checked = true;
    })
  );
  await page.click(".web-save-form input[type=submit]");
  await wait(60000);
  return page.url();
};
