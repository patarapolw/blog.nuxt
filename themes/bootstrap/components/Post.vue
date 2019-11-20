<template lang="pug">
b-card.mb-3.post
  .post-meta.mb-3
    .float-right {{dateString}}
    .post-meta-author
      a(:href="author.link"): b-img.mr-2(rounded="circle" :src="author.avatar")
      a(:href="author.link") {{author.login}}
  h2
    b-link(v-if="isTeaser" :to="to") {{title}}
    span(v-else="") {{title}}
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