#!/usr/bin/env node

import { program } from "commander";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");
import { transpile } from "../src/logging-espree.js";
import * as fs from "fs";

program
  .version(version)
  .argument("<filename>", 'file with the original code')
  .option("-o, --output <filename>", "file in which to write the output")
  .option("-s --show", "show result in console")
  .action((filename, options) => {
    transpile(filename, options.output, options.exec);
  });

program.parse(process.argv);
