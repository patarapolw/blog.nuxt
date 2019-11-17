"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showdown_1 = __importDefault(require("showdown"));
const hyperscript_1 = __importDefault(require("hyperscript"));
class Markdown {
    constructor() {
        this.converter = new showdown_1.default.Converter({
            parseImgDimensions: true
        });
        this.converter.setFlavor("github");
        this.converter.addExtension({
            type: "lang",
            filter(text) {
                const rowRegex = /(?:(?:^|\r?\n)(?:\| )?(?:(?:.* \| )+.+)*(?:.* \| )+.+(?: \|)?(?:$|\r?\n))+/m;
                text = text.replace(rowRegex, (p0) => {
                    return hyperscript_1.default("table.table", p0.trim().split("\n").map((pi) => {
                        pi = pi.trim().replace(/^|/, "").replace(/|$/, "");
                        return hyperscript_1.default("tr", pi.split(" | ").map((x) => x.trim()).map((qi) => {
                            return hyperscript_1.default("td", qi);
                        }));
                    })).outerHTML;
                });
                return text;
            }
        });
    }
    md2html(md) {
        return this.converter.makeHtml(md);
    }
}
exports.Markdown = Markdown;
exports.md = new Markdown();
exports.pugFilters = {
    markdown: (text) => {
        return exports.md.md2html(text);
    },
    css: (text) => {
        return hyperscript_1.default("style", { innerHTML: text });
    }
};
