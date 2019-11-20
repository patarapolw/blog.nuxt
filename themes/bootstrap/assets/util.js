import hljs from "highlight.js";
import hljsDefineVue from "highlightjs-vue";

export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  // $& means the whole matched string
}

export function normalizeArray(it) {
  if (Array.isArray(it)) {
    return it[0];
  }

  return it;
}

hljsDefineVue(hljs);

export function highlightBlock(parent) {
  Array.from(parent.querySelectorAll("pre code:not(.hljs)")).forEach((el) => {
    hljs.highlightBlock(el);
  });
}