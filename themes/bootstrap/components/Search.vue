<template lang="pug">
div
  h1.tag.mb-3(v-if="$route.params.tName") {{toTitleCase($route.params.tName)}}
  div(v-if="posts")
    post(v-for="p in posts" :name="p.name" :is-teaser="true" :key="p.name")
    b-pagination(v-model="page" :total-rows="count" :per-page="perPage")
  div(v-else)
    empty
</template>

<script>
import Post from "@/components/Post.vue";
import Empty from "@/components/Empty.vue";
import QParser from "q2filter";
import { normalizeArray, currentPosts } from "@/assets/util";
import config from "@/assets/build/config.json";

export default {
  components: {
    Post, Empty
  },
  props: {
    q: String
  },
  data() {
    return {
      posts: [],
      page: 1,
      count: 0,
      perPage: 5
    }
  },
  mounted() {
    this.page = parseInt(normalizeArray(this.$route.query.page) || "1");
    this.updatePosts();
  },
  watch: {
    "page"() {
      this.updatePosts();
    }
  },
  methods: {
    async updatePosts() {
      this.$router.push({query: {
        ...this.$route.query,
        page: this.page.toString()
      }});
      const parser = new QParser(this.q ,{
        isString: ["title", "author", "tag"],
        isDate: ["date"],
        filters: {
          "is:reversed": (items) => {
            return items.reverse();
          }
        },
        sortBy: {
          key: "date",
          desc: true
        }
      });
      let ps = parser.parse(currentPosts());
      const { perPage } = config.posts;
      this.perPage = perPage;
      this.count = ps.length;
      ps = ps.filter((p, i) => {
        const iPage = i / perPage;
        return iPage >= this.page - 1 && iPage < this.page;
      });
      this.posts = ps;
    },
    toTitleCase(s) {
      return s[0].toLocaleUpperCase() + s.substring(1);
    }
  }
}
</script>