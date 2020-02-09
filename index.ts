import { readFile } from "fs-extra";
import { load } from "js-yaml";
import { join } from "path";

export const archive = async () => {
  const yamlFile = await readFile(join(__dirname, "..", "urls.yml"));
  const yaml = load(yamlFile.toString());
  console.log("yaml", yaml);
};
