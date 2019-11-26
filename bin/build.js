const fs = require("fs-extra");
const del = require("del");
const glob = require("fast-glob");
const path = require("path");
const matter = require("gray-matter");
const { parseContent } = require("./mark-html");
const moment = require("moment");

function loadConfig(filepath, ROOT, keep) {
  const headers = {};
  let routes = [];
  const resources = [];
  let tags = [];
  const meta = {
    filepath: path.resolve(filepath)
  };

  if (!keep) {
    const buildDirs = [
      `${ROOT}/assets/build`,
      `${ROOT}/static/build`
    ];
  
    del.sync(buildDirs);
    buildDirs.forEach((b) => fs.ensureDirSync(b));
  }

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

      if (data && Object.keys(data).length > 0) {
        headers[p.name] = {
          ...data,
          teaser: parseContent(contentParts[0], p.ext),
          name: p.name,
          url
        }
        if (headers[p.name].date) {
          const m = moment(headers[p.name].date);
          headers[p.name].date = m.add(-m.utcOffset(), "minute").toISOString();
        }

        routes.push(`/post/${p.name}`);
      }

      if (Array.isArray(data.tag)) {
        tags.push(...data.tag);
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

  tags = tags.filter((t, i) => tags.map((el) => el.toLocaleLowerCase()).indexOf(t.toLocaleLowerCase()) === i);
  routes.push(...tags.map((el) => `/tag/${el}`));
  routes = Array.from(new Set(routes));
  meta.tags = tags;

  fs.writeFileSync(`${ROOT}/assets/build/headers.json`, JSON.stringify(headers));
  fs.writeFileSync(`${ROOT}/assets/build/routes.json`, JSON.stringify(routes));
  fs.writeFileSync(`${ROOT}/assets/build/resources.json`, JSON.stringify(resources));
  fs.writeFileSync(`${ROOT}/assets/build/meta.json`, JSON.stringify(meta));
}

if (require.main === module) {
  loadConfig("user");
}

module.exports = {
  loadConfig
};