import fs from "fs-extra";
import del from "del";
import glob from "fast-glob";
import path from "path";
import matter from "gray-matter";
import { md, pugFilters } from "./make-html";
import pug from "pug";

export const ROOT = path.dirname(__dirname);

export function loadConfig(filepath: string) {
  const headers: any = {};
  let routes: string[] = [];
  const resources: string[] = [];
  const meta: any = {
    filepath
  };

  const buildDirs = [
    `${ROOT}/assets/build`,
    `${ROOT}/static/build`
  ];

  del.sync(buildDirs);
  buildDirs.forEach((b) => fs.ensureDirSync(b));

  fs.copyFileSync(`${filepath}/config.json`, `${ROOT}/assets/build/config.json`);

  glob.sync(`${filepath}/data/**/*.*`).map((f) => {
    const p = path.parse(f);
    if (p.base === "favicon.ico") {
      fs.copyFileSync(f, `${ROOT}/static/build/favicon.ico`);
      return;
    }

    if ([".md", ".pug", ".html"].includes(p.ext)) {
      const url = `/build/${path.relative(`${filepath}/data`, f)}`.replace(/\.[A-Z]+$/i, ".html");

      const { data, content } = matter(fs.readFileSync(f, "utf8"));
      const contentParts = content.split(/\n===\n/);

      if (data) {
        headers[p.name] = {
          ...data,
          teaser: parseContent(contentParts[0], p.ext),
          name: p.name,
          url
        }

        routes.push(`/post/${p.name}`);
      }

      if (Array.isArray(data.tag)) {
        routes.push(...data.tag.map((el: string) => `/tag/${el}`));
      }

      fs.ensureFileSync(`${ROOT}/static${url}`);
      fs.writeFileSync(`${ROOT}/static${url}`, parseContent(contentParts.join("\n"), p.ext));
      
      resources.push(url);
    } else if (p.ext === ".js") {
      const url = `/build/${path.relative(`${filepath}/data`, f)}`;
      fs.ensureFileSync(`${ROOT}/static${url}`);
      fs.copyFileSync(f, `${ROOT}/static${url}`);

      resources.push(url);
    } else {
      const url = `@/assets/build/${path.relative(`${filepath}/data`, f)}`;

      fs.ensureFileSync(url.replace(/^@/, ROOT));
      fs.copyFileSync(f, url.replace(/^@/, ROOT));
    }
  });

  routes = Array.from(new Set(routes));

  fs.writeFileSync(`${ROOT}/assets/build/headers.json`, JSON.stringify(headers));
  fs.writeFileSync(`${ROOT}/assets/build/routes.json`, JSON.stringify(routes));
  fs.writeFileSync(`${ROOT}/assets/build/resources.json`, JSON.stringify(resources));
  fs.writeFileSync(`${ROOT}/assets/build/meta.json`, JSON.stringify(meta));
}

function parseContent(s: string, ext: string) {
  if (ext === ".pug") {
    return pug.compile(s, {filters: pugFilters})();
  } else if (ext === ".md") {
    return md.md2html(s);
  }
  return s;
}

if (require.main === module) {
  loadConfig("user");
}