"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const del_1 = __importDefault(require("del"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const make_html_1 = require("./make-html");
const pug_1 = __importDefault(require("pug"));
exports.ROOT = path_1.default.dirname(__dirname);
function loadConfig(filepath) {
    const headers = {};
    let routes = [];
    const resources = [];
    const meta = {
        filepath
    };
    const buildDirs = [
        `${exports.ROOT}/assets/build`,
        `${exports.ROOT}/static/build`
    ];
    del_1.default.sync(buildDirs);
    buildDirs.forEach((b) => fs_extra_1.default.ensureDirSync(b));
    fs_extra_1.default.copyFileSync(`${filepath}/config.json`, `${exports.ROOT}/assets/build/config.json`);
    fast_glob_1.default.sync(`${filepath}/data/**/*.*`).map((f) => {
        const p = path_1.default.parse(f);
        if (p.base === "favicon.ico") {
            fs_extra_1.default.copyFileSync(f, `${exports.ROOT}/static/build/favicon.ico`);
            return;
        }
        if ([".md", ".pug", ".html"].includes(p.ext)) {
            const url = `/build/${path_1.default.relative(`${filepath}/data`, f)}`.replace(/\.[A-Z]+$/i, ".html");
            const { data, content } = gray_matter_1.default(fs_extra_1.default.readFileSync(f, "utf8"));
            const contentParts = content.split(/\n===\n/);
            if (data) {
                headers[p.name] = {
                    ...data,
                    teaser: parseContent(contentParts[0], p.ext),
                    name: p.name,
                    url
                };
                routes.push(`/post/${p.name}`);
            }
            if (Array.isArray(data.tag)) {
                routes.push(...data.tag.map((el) => `/tag/${el}`));
            }
            fs_extra_1.default.ensureFileSync(`${exports.ROOT}/static${url}`);
            fs_extra_1.default.writeFileSync(`${exports.ROOT}/static${url}`, parseContent(contentParts.join("\n"), p.ext));
            resources.push(url);
        }
        else if (p.ext === ".js") {
            const url = `/build/${path_1.default.relative(`${filepath}/data`, f)}`;
            fs_extra_1.default.ensureFileSync(`${exports.ROOT}/static${url}`);
            fs_extra_1.default.copyFileSync(f, `${exports.ROOT}/static${url}`);
            resources.push(url);
        }
        else {
            const url = `@/assets/build/${path_1.default.relative(`${filepath}/data`, f)}`;
            fs_extra_1.default.ensureFileSync(url.replace(/^@/, exports.ROOT));
            fs_extra_1.default.copyFileSync(f, url.replace(/^@/, exports.ROOT));
        }
    });
    routes = Array.from(new Set(routes));
    fs_extra_1.default.writeFileSync(`${exports.ROOT}/assets/build/headers.json`, JSON.stringify(headers));
    fs_extra_1.default.writeFileSync(`${exports.ROOT}/assets/build/routes.json`, JSON.stringify(routes));
    fs_extra_1.default.writeFileSync(`${exports.ROOT}/assets/build/resources.json`, JSON.stringify(resources));
    fs_extra_1.default.writeFileSync(`${exports.ROOT}/assets/build/meta.json`, JSON.stringify(meta));
}
exports.loadConfig = loadConfig;
function parseContent(s, ext) {
    if (ext === ".pug") {
        return pug_1.default.compile(s, { filters: make_html_1.pugFilters })();
    }
    else if (ext === ".md") {
        return make_html_1.md.md2html(s);
    }
    return s;
}
if (require.main === module) {
    loadConfig("user");
}
