import hljs from "highlight.js";
import hljsDefineVue from "highlightjs-vue";
import headers from "./build/headers.json";

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

export function currentPosts() {
  const now = new Date().toISOString();
  return Object.values(headers).filter((h) => h.date && h.date <= now);
}