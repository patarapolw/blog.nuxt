#!/usr/bin/env node

const { loadConfig } = require("./build");
const { spawnSync } = require("child_process");
const program = require("commander");
const path = require("path");
const fs = require("fs-extra");

program
  .option("-b --build", "Where to create a dist folder or run a development server")
  .option("-d --dir <path>", "The folder where to load the config")
  .option("-p --project <path>", "The folder where the project folder lives")
  .option("-c --create", "Generate config files only")
  .option("-w --watch", "Watch config and data files")
  .option("-k --keep", "keep previous config")
  .parse(process.argv);

if (program.watch) {
  console.log("Watch is not yet implemented.");
  process.exit(1);
}

const themeDir = program.project || path.resolve(__dirname, "../themes/bootstrap");

console.log("Compiling config.json");
console.log(`Using theme: ${themeDir}`);
loadConfig(program.dir || ".", themeDir, program.watch && program.keep);

if (!program.create) {
  if (!fs.existsSync(path.join(themeDir, "node_modules"))) {
    spawnSync("npm", ["install"], {
      cwd: themeDir,
      stdio: "inherit"
    });
  }

  if (program.build) {
    spawnSync("npm", ["run", "generate"], {
      cwd: themeDir,
      stdio: "inherit"
    });
  } else {
    spawnSync("npm", ["run", "dev"], {
      cwd: themeDir,
      stdio: "inherit"
    });
  }
}