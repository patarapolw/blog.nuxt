#!/usr/bin/env node

import { loadConfig, ROOT } from "./build";
import { spawnSync } from "child_process";
import program from "commander";

program
  .option("-b --build")
  .option("-d --dir");

program.parse(process.argv);

loadConfig(program.dir || process.cwd());

if (program.build) {
  spawnSync("npm", ["run", "generate"], {
    cwd: ROOT,
    stdio: "inherit"
  });
} else {
  spawnSync("npm", ["start"], {
    cwd: ROOT,
    stdio: "inherit"
  });
}