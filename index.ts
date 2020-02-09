import { readFile } from "fs-extra";
import { load } from "js-yaml";
import { join } from "path";
import {} from "puppeteer";

export const archive = async () => {
  const yarn = await readFile(join(__dirname, "..", "urls.yml"));
  const urls: string[] = load(yarn.toString());
  for await (const url of urls) {
    await archiveUrl(url);
    console.log("✓ Archived", url);
  }
};

const archiveUrl = async (url: string) => {};
