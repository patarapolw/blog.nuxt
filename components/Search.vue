<template lang="pug">
div
  h1.tag(v-if="$route.params.tName") {{toTitleCase($route.params.tName)}}
  div(v-if="posts")
    post(v-for="p in posts" :name="p.name" :is-teaser="true" :key="p.name")
    b-pagination(v-model="page" :total-rows="count" :per-page="perPage")
  div(v-else)
    empty
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Post from "@/components/Post.vue";
import Empty from "@/components/Empty.vue";
import QParser from "q2filter";
import { normalizeArray } from "@/assets/util";
import headers from "@/assets/build/headers.json";
import config from "@/assets/build/config.json";

@Component({
  components: {
    Post, Empty
  }
})
export default class Search extends Vue {
  @Prop() q!: string;

  posts?: any[] = [];
  page: number = 1;
  count: number = 0;
  perPage: number = 5;

  mounted() {
    this.page = parseInt(normalizeArray(this.$route.query.page) || "1");
    this.updatePosts();
  }

  @Watch("page")
  private async updatePosts() {
    this.$router.push({query: {
      ...this.$route.query,
      page: this.page.toString()
    }});

    const parser = new QParser(this.q ,{
      isString: ["title", "author", "tag"],
      isDate: ["date"],
      filters: {
        "is:reversed": (items: any) => {
          return items.reverse();
        }
      },
      sortBy: {
        key: "date",
        desc: true
      }
    });

    let ps = parser.parse(Object.values(headers));
    const { perPage } = config.posts;
    this.perPage = perPage;
    this.count = ps.length;
    ps = ps.filter((p, i) => {
      const iPage = i / perPage;
      return iPage >= this.page - 1 && iPage < this.page;
    });
    this.posts = ps;
  }

  toTitleCase(s: string) {
    return s[0].toLocaleUpperCase() + s.substring(1);
  }
}
</script>