const showdown = require("showdown");
const h = require("hyperscript");
const pug = require("pug");
const ext = require("./extensions");

class Markdown {
  constructor() {
    this.converter = new showdown.Converter({
      parseImgDimensions: true
    });
    this.converter.setFlavor("github");
    ext.forEach((el) => this.converter.addExtension(el));
  }

  md2html(md) {
    return this.converter.makeHtml(md);
  }
}

const md = new Markdown();
const pugFilters = {
  markdown: (text) => {
    return md.md2html(text);
  },
  css: (text) => {
    return h("style", {innerHTML: text});
  }
};

/**
 * 
 * @param {string} s 
 * @param {string} [ext] 
 */
function parseContent(s, ext) {
  if (ext === ".pug") {
    return pug.compile(s, {filters: pugFilters})();
  } else if (ext === ".md") {
    return md.md2html(s);
  }
  return s;
}

module.exports = {
  Markdown, md, pugFilters, parseContent
}