module.exports = [
  {
    type: "lang",
    filter(text) {
      const rowRegex = /(?:(?:^|\r?\n)(?:\| )?(?:(?:.* \| )+.+)*(?:.* \| )+.+(?: \|)?(?:$|\r?\n))+/m;

      text = text.replace(rowRegex, (p0) => {
        return h("table.table", p0.trim().split("\n").map((pi) => {
          pi = pi.trim().replace(/^|/, "").replace(/|$/, "")

          return h("tr", pi.split(" | ").map((x) => x.trim()).map((qi) => {
            return h("td", qi);
          }))
        })).outerHTML;
      });

      return text;
    }
  }
]