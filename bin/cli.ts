#!/usr/bin/env node

import { loadConfig, ROOT } from "./build";
import { spawnSync } from "child_process";
import program from "commander";

program
  .option("-b --build", "Where to create a dist folder or run a development server")
  .option("-d --dir <path>", "The folder where to load the config")
  .option("-p --project <path>", "The folder where the project folder lives")
  .parse(process.argv);

loadConfig(typeof program.dir === "string" ? program.dir : process.cwd());

const spawnCwd = typeof program.project === "string" ? program.project : ROOT;

if (program.build) {
  spawnSync("npm", ["run", "generate"], {
    cwd: spawnCwd,
    stdio: "inherit"
  });
} else {
  spawnSync("npm", ["run", "dev"], {
    cwd: spawnCwd,
    stdio: "inherit"
  });
}