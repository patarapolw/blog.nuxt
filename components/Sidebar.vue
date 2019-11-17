<template lang="pug">
div
  b-card.mb-3(v-show="aboveHtml" v-html="aboveHtml")
  b-card.mb-3
    h3 Tag cloud
    span.mr-3.tag(v-for="t in tags" :key="t.name" :class="t.class")
      b-link(:to="'/tag/' + t.name") {{t.name}}
  b-card.mb-3(v-show="belowHtml" v-html="belowHtml")
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { highlightBlock } from "@/assets/util";
import config from "@/assets/build/config.json";
import headers from "@/assets/build/headers.json";
import resources from "@/assets/build/resources.json";

@Component
export default class Sidebar extends Vue {
  aboveHtml = "";
  belowHtml = "";

  constructor(...props: any[]) {
    super(...props);

    try {
      this.aboveHtml = require("@/static/build/sidebar-above.html").default;
    } catch(e) {}

    try {
      this.belowHtml = require("@/static/build/sidebar-below.html").default;
    } catch(e) {}
  }

  mounted() {
    highlightBlock(this.$el);
  }

  get tags() {
    const tagList: Record<string, number> = {};
    Object.values(headers).forEach((p) => {
      for (const t of p.tag || []) {
        tagList[t] = (tagList[t] || 0) + 1;
      }
    });
    return Object.keys(tagList).sort((a, b) => {
      return tagList[b] - tagList[a];
    }).slice(0, 30).map((t) => {
      return {
        name: t,
        class: (() => {
          const count = tagList[t];
          if (count > 30) {
            return "c30"
          } else if (count > 20) {
            return "c20"
          } else if (count > 10) {
            return "c10"
          } else if (count > 5) {
            return "c5"
          } else if (count > 3) {
            return "c3"
          } else if (count > 1) {
            return "c2"
          }
          return "c1"
        })()
      }
    });
  }
}
</script>

<style lang="scss">
.tag {
  white-space: nowrap;
}
.c30 {
  font-size: 40px;
}
.c20 {
  font-size: 30px;
}
.c10 {
  font-size: 25px;
}
.c5 {
  font-size: 20px;
}
.c3 {
  font-size: 16px;
}
.c2 {
  font-size: 13px;
}
.c1 {
  font-size: 10px;
}
</style>