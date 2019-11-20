#!/usr/bin/env node

const { loadConfig } = require("./build");
const { spawnSync } = require("child_process");
const program = require("commander");
const path = require("path");

program
  .option("-b --build", "Where to create a dist folder or run a development server")
  .option("-d --dir <path>", "The folder where to load the config")
  .option("-p --project <path>", "The folder where the project folder lives")
  .option("-c --create", "Generate config files only")
  .option("-k --keep", "keep previous config")
  .parse(process.argv);

console.log("Compiling config.json");
loadConfig(program.dir || ".", program.project || path.resolve(__dirname, "../themes/bootstrap"), program.keep);

if (!program.create) {
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
}