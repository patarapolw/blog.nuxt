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
    .option("-b --build")
    .option("-d --dir");
commander_1.default.parse(process.argv);
build_1.loadConfig(commander_1.default.dir || process.cwd());
if (commander_1.default.build) {
    child_process_1.spawnSync("npm", ["run", "generate"], {
        cwd: build_1.ROOT,
        stdio: "inherit"
    });
}
else {
    child_process_1.spawnSync("npm", ["start"], {
        cwd: build_1.ROOT,
        stdio: "inherit"
    });
}
