#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = require("./build");
const child_process_1 = require("child_process");
const commander_1 = __importDefault(require("commander"));
commander_1.default
    .option("-b --build", "Where to create a dist folder or run a development server")
    .option("-d --dir <path>", "The folder where to load the config")
    .option("-p --project <path>", "The folder where the project folder lives")
    .parse(process.argv);
build_1.loadConfig(typeof commander_1.default.dir === "string" ? commander_1.default.dir : process.cwd());
const spawnCwd = typeof commander_1.default.project === "string" ? commander_1.default.project : build_1.ROOT;
if (commander_1.default.build) {
    child_process_1.spawnSync("npm", ["run", "generate"], {
        cwd: spawnCwd,
        stdio: "inherit"
    });
}
else {
    child_process_1.spawnSync("npm", ["run", "dev"], {
        cwd: spawnCwd,
        stdio: "inherit"
    });
}
