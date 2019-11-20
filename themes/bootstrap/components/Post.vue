<template lang="pug">
b-card.mb-3.post
  .post-meta.mb-3
    .float-right {{dateString}}
    .post-meta-author
      a(:href="author.link"): b-img.mr-2(rounded="circle" :src="author.avatar")
      a(:href="author.link") {{author.login}}
  h2.mb-3
    span(v-if="!isTeaser") {{title}}
  div(v-if="header.image" :class="(isTeaser && min800) ? 'wh-300': 'full-width'")
    b-card-img.mb-3(:src="header.image")
  h2.mb-3
    b-link(v-if="isTeaser" :to="to") {{title}}
  div
    div(v-if="isTeaser" v-html="teaser")
    div(v-else="" v-html="content")
</template>

<script>
import moment, { Moment } from "moment";
import matter from "gray-matter";
import { highlightBlock } from "@/assets/util";
import config from "@/assets/build/config.json";
import headers from "@/assets/build/headers.json";

export default {
  props: {
    isTeaser: {
      type: Boolean,
      default: false
    },
    name: String
  },
  data() {
    return {
      content: ""
    }
  },
  computed: {
    title() {
      return this.header.title;
    },
    moment() {
      if (this.header.date) {
        return moment(this.header.date);
      }
      return null;
    },
    dateString() {
      return this.moment ? this.moment.format("ddd D MMMM YYYY") : "";
    },
    author() {
      const author = this.header.author || config.author;
      if (!author) {
        return {
          link: "#",
          avatar: "#",
          login: "Anonymous"
        }
      }
      return author;
    },
    to() {
      return `/post/${this.name}`;
    },
    header() {
      return headers[this.name] || {};
    },
    teaser() {
      return this.header.teaser;
    },
    url() {
      return `${config.baseUrl || ""}/post/${this.name}`;
    },
    min800() {
      if (process.client) {
        return matchMedia("(min-width: 800px)").matches;
      }

      return true;
    }
  },
  async mounted() {
    if (this.header.url) {
      this.content = await (await fetch(`${config.baseUrl}${this.header.url}`)).text();
    }
  },
  updated() {
    highlightBlock(this.$el);
  }
}
</script>

<style lang="scss">
@media only screen and (min-width: 800px) {
  .wh-300 {
    max-width: 300px;
    max-height: 300px;
    float: right;
  }
}

.full-width {
  margin-left: -1.25rem;
  margin-right: -1.25rem;
  max-width: calc(100% + 2.5rem);
  text-align: center;
}
</style>